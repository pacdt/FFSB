import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ZoomIn, ZoomOut } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import DOMPurify from 'dompurify';
import HTMLFlipBook from 'react-pageflip';
import './Artigo.css';

import artigosData from '../assets/artigos.json';

const mdxImporters = import.meta.glob('../content/articles/*/index.mdx');
const mdxImporterBySlug = Object.fromEntries(
  Object.entries(mdxImporters)
    .map(([path, importer]) => {
      const match = path.match(/\.\.\/content\/articles\/([^/]+)\/index\.mdx$/);
      if (!match) return null;
      return [match[1], importer];
    })
    .filter(Boolean),
);

const contentAssetUrls = import.meta.glob('../content/articles/**/*.{png,jpg,jpeg,webp,svg,pdf}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const contentAssetUrlByPath = new Map(Object.entries(contentAssetUrls));

function resolveContentAssetUrl({ slug, reference }) {
  if (!reference || typeof reference !== 'string') return null;

  if (reference.startsWith('http://') || reference.startsWith('https://')) return reference;
  if (reference.startsWith('/')) return reference;

  let key = null;

  if (reference.startsWith('articles/')) {
    key = `../content/${reference}`;
  } else if (reference.startsWith('./')) {
    if (!slug) return reference;
    key = `../content/articles/${slug}/${reference.slice(2)}`;
  } else if (reference.startsWith('images/') || reference.startsWith('files/')) {
    if (!slug) return reference;
    key = `../content/articles/${slug}/${reference}`;
  }

  if (key && contentAssetUrlByPath.has(key)) return contentAssetUrlByPath.get(key);
  return reference;
}

function normalizeHref(href, slug) {
  if (!href || typeof href !== 'string') return href;
  const trimmed = href.trim();
  if (/^javascript:/i.test(trimmed)) return '#';
  return resolveContentAssetUrl({ slug, reference: trimmed });
}

function usePdfDocument(url) {
  const [state, setState] = useState({ status: 'idle', pdf: null, pageCount: 0, error: null });

  useEffect(() => {
    let cancelled = false;
    let loadingTask = null;

    if (!url) {
      setState({ status: 'idle', pdf: null, pageCount: 0, error: null });
      return () => {};
    }

    setState({ status: 'loading', pdf: null, pageCount: 0, error: null });

    (async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');

        try {
          const workerUrl = (await import('pdfjs-dist/legacy/build/pdf.worker.min?url')).default;
          pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
        } catch {
        }

        loadingTask = pdfjsLib.getDocument({ url, disableWorker: !pdfjsLib.GlobalWorkerOptions?.workerSrc });
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        setState({ status: 'ready', pdf, pageCount: pdf.numPages, error: null });
      } catch (error) {
        if (cancelled) return;
        setState({ status: 'error', pdf: null, pageCount: 0, error });
      }
    })();

    return () => {
      cancelled = true;
      try {
        loadingTask?.destroy?.();
      } catch {
      }
    };
  }, [url]);

  return state;
}

function useFirstPdfPageRatio(pdf) {
  const [ratio, setRatio] = useState(594 / 420);

  useEffect(() => {
    let cancelled = false;

    if (!pdf) return () => {};

    (async () => {
      try {
        const page = await pdf.getPage(1);
        if (cancelled) return;
        const viewport = page.getViewport({ scale: 1 });
        if (!viewport?.width) return;
        setRatio(viewport.height / viewport.width);
      } catch {
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdf]);

  return ratio;
}

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return () => {};

    const update = () => {
      const rect = el.getBoundingClientRect();
      setWidth(rect.width);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => {
      try {
        ro.disconnect();
      } catch {
      }
    };
  }, [ref]);

  return width;
}

const FlipbookPdfPage = React.forwardRef(function FlipbookPdfPage(
  { pdf, pageNumber, pageWidth, pageHeight },
  ref,
) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    if (!pdf || !pageNumber) return () => {};
    const canvas = canvasRef.current;
    if (!canvas) return () => {};

    (async () => {
      try {
        const page = await pdf.getPage(pageNumber);
        if (cancelled) return;

        const viewport = page.getViewport({ scale: 1 });
        const scale = pageWidth / viewport.width;
        const dpr = window.devicePixelRatio || 1;
        const scaledViewport = page.getViewport({ scale: scale * dpr });

        canvas.width = Math.floor(scaledViewport.width);
        canvas.height = Math.floor(scaledViewport.height);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
      } catch {
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdf, pageNumber, pageWidth, pageHeight]);

  if (!pageNumber) {
    return (
      <div className="flipbook-pdf-page flipbook-pdf-page-blank" ref={ref}>
        <div className="flipbook-pdf-page-inner" style={{ width: pageWidth, height: pageHeight }} />
      </div>
    );
  }

  return (
    <div className="flipbook-pdf-page" ref={ref}>
      <div className="flipbook-pdf-page-inner" style={{ width: pageWidth, height: pageHeight }}>
        <canvas className="flipbook-pdf-canvas" ref={canvasRef} />
      </div>
    </div>
  );
});

function FlipbookPdf({ src, title, slug }) {
  const resolvedSrc = resolveContentAssetUrl({ slug, reference: src });
  const flipbookRef = useRef(null);
  const availableRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { status, pdf, pageCount } = usePdfDocument(resolvedSrc);
  const availableWidth = useElementWidth(availableRef);
  const pageRatio = useFirstPdfPageRatio(pdf);
  const isMobile = availableWidth > 0 && availableWidth < 640;
  const [zoom, setZoom] = useState(1);

  // Drag to scroll logic
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

  const onMouseDown = (e) => {
    // Only enable drag if zoomed in or if content overflows
    if (zoom <= 1 && !isMobile) return;
    
    setIsDragging(true);
    setStartPos({ x: e.pageX, y: e.pageY });
    if (scrollContainerRef.current) {
        setScrollPos({ 
            left: scrollContainerRef.current.scrollLeft, 
            top: scrollContainerRef.current.scrollTop 
        });
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const y = e.pageY;
    const walkX = (x - startPos.x) * 1.5; // Scroll speed
    const walkY = (y - startPos.y) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollPos.left - walkX;
    scrollContainerRef.current.scrollTop = scrollPos.top - walkY;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch support
  const onTouchStart = (e) => {
    // Only enable drag if zoomed in or if content overflows
    if (zoom <= 1 && !isMobile) return;
    
    setIsDragging(true);
    setStartPos({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    if (scrollContainerRef.current) {
        setScrollPos({ 
            left: scrollContainerRef.current.scrollLeft, 
            top: scrollContainerRef.current.scrollTop 
        });
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    // Don't prevent default here to allow pinch-zoom if needed, 
    // but for pan we might want to prevent scrolling the whole page
    // e.preventDefault(); 
    
    const x = e.touches[0].pageX;
    const y = e.touches[0].pageY;
    const walkX = (x - startPos.x) * 1.5;
    const walkY = (y - startPos.y) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollPos.left - walkX;
    scrollContainerRef.current.scrollTop = scrollPos.top - walkY;
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  const pageSize = useMemo(() => {
    const maxPageWidth = 520;
    const available = availableWidth
      ? isMobile
        ? Math.max(220, Math.floor(availableWidth - 32))
        : Math.max(220, Math.floor((availableWidth - 32) / 2))
      : maxPageWidth;
    const basePageWidth = Math.min(maxPageWidth, available);
    const basePageHeight = Math.floor(basePageWidth * pageRatio);
    
    return { 
      pageWidth: Math.floor(basePageWidth * zoom), 
      pageHeight: Math.floor(basePageHeight * zoom) 
    };
  }, [availableWidth, isMobile, pageRatio, zoom]);

  const pageNumbers = useMemo(() => {
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    if (!isMobile && pages.length % 2 !== 0) pages.push(null);
    return pages;
  }, [isMobile, pageCount]);

  if (!resolvedSrc) return null;

  return (
    <div className="flipbook-pdf">
      <div className="flipbook-pdf-header">
        <strong>{title || 'Documento'}</strong>
        <a href={resolvedSrc} target="_blank" rel="noopener noreferrer">
          Abrir PDF
        </a>
      </div>
      <div className="flipbook-pdf-body" ref={availableRef}>
        <div className="flipbook-pdf-controls">
          <button
            type="button"
            className="flipbook-pdf-btn btn-prev"
            onClick={() => flipbookRef.current?.pageFlip()?.flipPrev()}
            disabled={status !== 'ready'}
          >
            Anterior
          </button>
          
          <div className="flipbook-pdf-zoom">
            <button
                type="button"
                className="flipbook-pdf-btn icon-only"
                onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                disabled={status !== 'ready' || zoom <= 0.5}
                title="Diminuir Zoom"
            >
                <ZoomOut size={16} />
            </button>
            <span className="zoom-value">{Math.round(zoom * 100)}%</span>
            <button
                type="button"
                className="flipbook-pdf-btn icon-only"
                onClick={() => setZoom(z => Math.min(2.0, z + 0.1))}
                disabled={status !== 'ready' || zoom >= 2.0}
                title="Aumentar Zoom"
            >
                <ZoomIn size={16} />
            </button>
          </div>

          <div className="flipbook-pdf-status">
            {status === 'loading' && 'Carregando PDF...'}
            {status === 'error' && 'Erro ao carregar PDF'}
            {status === 'ready' && `Página ${currentPage + 1} de ${pageCount}`}
          </div>
          <button
            type="button"
            className="flipbook-pdf-btn btn-next"
            onClick={() => flipbookRef.current?.pageFlip()?.flipNext()}
            disabled={status !== 'ready'}
          >
            Próxima
          </button>
        </div>

        {status === 'ready' ? (
          <div 
            className="flipbook-pdf-book-wrap" 
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <HTMLFlipBook
              key={`flipbook-${zoom}-${isMobile ? 'mobile' : 'desktop'}`}
              width={pageSize.pageWidth}
              height={pageSize.pageHeight}
              size="fixed"
              minWidth={pageSize.pageWidth}
              maxWidth={pageSize.pageWidth}
              minHeight={pageSize.pageHeight}
              maxHeight={pageSize.pageHeight}
              autoSize={true}
              usePortrait={isMobile}
              startPage={currentPage}
              drawShadow
              maxShadowOpacity={0.5}
              mobileScrollSupport
              showCover={false}
              ref={flipbookRef}
              onFlip={(e) => setCurrentPage(e.data)}
              className="flipbook-pdf-book"
            >
              {pageNumbers.map((pageNumber, idx) => (
                <FlipbookPdfPage
                  key={`${pageNumber ?? 'blank'}-${idx}`}
                  pdf={pdf}
                  pageNumber={pageNumber}
                  pageWidth={pageSize.pageWidth}
                  pageHeight={pageSize.pageHeight}
                />
              ))}
            </HTMLFlipBook>
          </div>
        ) : (
          <div className="flipbook-pdf-fallback">
            <a href={resolvedSrc} target="_blank" rel="noopener noreferrer">
              Abrir PDF em outra aba
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const Artigo = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [MdxComponent, setMdxComponent] = useState(null);
  const [mdxLoading, setMdxLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = useCallback((src, alt) => {
    setModalImage({ src, alt });
  }, []);

  const closeModal = useCallback(() => {
    setModalImage(null);
  }, []);

  const handleImageKeyDown = useCallback(
    (event, src, alt) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(src, alt);
      }
    },
    [openModal],
  );

  useEffect(() => {
    let cancelled = false;

    const foundArticle = artigosData.find((a) => a.id === parseInt(id, 10));
    setArticle(foundArticle);
    setLoading(false);

    setMdxComponent(null);
    setMdxLoading(false);

    if (foundArticle?.contentType === 'mdx' && foundArticle?.slug) {
      const importer = mdxImporterBySlug[foundArticle.slug];
      if (!importer) return () => {};

      setMdxLoading(true);
      importer()
        .then((mod) => {
          if (cancelled) return;
          setMdxComponent(() => mod.default);
        })
        .finally(() => {
          if (cancelled) return;
          setMdxLoading(false);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  const mdxComponents = useMemo(() => {
    const slug = article?.slug;

    return {
      FlipbookPdf: (props) => <FlipbookPdf {...props} slug={slug} />,
      a: (props) => {
        const normalizedHref = normalizeHref(props?.href, slug);
        return <a {...props} href={normalizedHref} />;
      },
      img: (props) => {
        const normalizedSrc = resolveContentAssetUrl({ slug, reference: props?.src });
        const alt = props?.alt || 'Imagem';
        const className = props?.className ? `${props.className} image-clickable` : 'image-clickable';
        return (
          <img
            {...props}
            src={normalizedSrc}
            alt={alt}
            className={className}
            role="button"
            tabIndex={0}
            onClick={() => openModal(normalizedSrc, alt)}
            onKeyDown={(event) => handleImageKeyDown(event, normalizedSrc, alt)}
          />
        );
      },
    };
  }, [article?.slug, handleImageKeyDown, openModal]);

  useEffect(() => {
    if (!modalImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage, closeModal]);

  useEffect(() => {
    if (!modalImage) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalImage]);

  if (loading) {
    return <div className="page-container loading">Carregando...</div>;
  }

  if (!article) {
    return (
      <div className="page-container error">
        <h2>Artigo não encontrado</h2>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container artigo-page">
      <div className="article-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Voltar
        </Link>

        <header className="article-header">
          <h1 className="article-title">{article.titulo}</h1>
          <div className="article-meta">
            <Calendar size={16} />
            <span>{article.createdAt ? `Publicado em ${article.createdAt}` : 'Publicado recentemente'}</span>
          </div>
        </header>

        {article.imagem && (
          <div className="article-featured-image">
            <img
              src={resolveContentAssetUrl({ slug: article.slug, reference: article.imagem })}
              alt={article.titulo}
              className="image-clickable"
              role="button"
              tabIndex={0}
              onClick={() =>
                openModal(resolveContentAssetUrl({ slug: article.slug, reference: article.imagem }), article.titulo)
              }
              onKeyDown={(event) =>
                handleImageKeyDown(
                  event,
                  resolveContentAssetUrl({ slug: article.slug, reference: article.imagem }),
                  article.titulo,
                )
              }
            />
          </div>
        )}

        <div
          className="article-body"
          onClick={(event) => {
            const target = event.target;
            if (target instanceof HTMLImageElement) {
              openModal(target.currentSrc || target.src, target.alt || 'Imagem');
            }
          }}
        >
          {article.contentType === 'mdx' ? (
            mdxLoading ? (
              <div>Carregando conteúdo...</div>
            ) : MdxComponent ? (
              <MDXProvider components={mdxComponents}>
                <MdxComponent />
              </MDXProvider>
            ) : (
              <div>Conteúdo não encontrado.</div>
            )
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.conteudo || '', {
                  ALLOWED_TAGS: [
                    'a',
                    'abbr',
                    'b',
                    'blockquote',
                    'br',
                    'cite',
                    'code',
                    'div',
                    'em',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'hr',
                    'i',
                    'img',
                    'li',
                    'ol',
                    'p',
                    'pre',
                    'span',
                    'strong',
                    'ul',
                  ],
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title'],
                  ALLOW_UNKNOWN_PROTOCOLS: false,
                }),
              }}
            />
          )}
        </div>

        {modalImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
              <button className="close-btn" onClick={closeModal} type="button">
                &times;
              </button>
              <img src={modalImage.src} alt={modalImage.alt} />
              <p className="modal-caption">{modalImage.alt}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artigo;
