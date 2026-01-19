import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const { status, pdf, pageCount } = usePdfDocument(resolvedSrc);
  const availableWidth = useElementWidth(availableRef);
  const pageRatio = useFirstPdfPageRatio(pdf);
  const isMobile = availableWidth > 0 && availableWidth < 640;

  const pageSize = useMemo(() => {
    const maxPageWidth = 520;
    const available = availableWidth
      ? isMobile
        ? Math.max(220, Math.floor(availableWidth - 32))
        : Math.max(220, Math.floor((availableWidth - 32) / 2))
      : maxPageWidth;
    const pageWidth = Math.min(maxPageWidth, available);
    const pageHeight = Math.floor(pageWidth * pageRatio);
    return { pageWidth, pageHeight };
  }, [availableWidth, isMobile, pageRatio]);

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
            className="flipbook-pdf-btn"
            onClick={() => flipbookRef.current?.pageFlip()?.flipPrev()}
            disabled={status !== 'ready'}
          >
            Anterior
          </button>
          <div className="flipbook-pdf-status">
            {status === 'loading' ? 'Carregando…' : status === 'error' ? 'Erro ao abrir o PDF' : `Página ${currentPage + 1}`}
          </div>
          <button
            type="button"
            className="flipbook-pdf-btn"
            onClick={() => flipbookRef.current?.pageFlip()?.flipNext()}
            disabled={status !== 'ready'}
          >
            Próxima
          </button>
        </div>

        {status === 'ready' ? (
          <div className="flipbook-pdf-book-wrap">
            <HTMLFlipBook
              width={pageSize.pageWidth}
              height={pageSize.pageHeight}
              size="fixed"
              autoSize
              usePortrait={isMobile}
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
        return <img {...props} src={normalizedSrc} />;
      },
    };
  }, [article?.slug]);

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
            <img src={resolveContentAssetUrl({ slug: article.slug, reference: article.imagem })} alt={article.titulo} />
          </div>
        )}

        <div className="article-body">
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
      </div>
    </div>
  );
};

export default Artigo;
