import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import './Loja.css';
import produtosData from '../assets/produtos.json';

const Loja = () => {
  const phone = '5579998789509';
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

  const makeImageProps = (src, alt) => ({
    src,
    alt,
    className: 'image-clickable',
    role: 'button',
    tabIndex: 0,
    onClick: () => openModal(src, alt),
    onKeyDown: (event) => handleImageKeyDown(event, src, alt),
  });

  return (
    <div className="page-container loja-page">
      <h1 className="section-title">Nossa Loja</h1>

      <div className="loja-container">
        <p className="loja-subtitle">Artigos Religiosos Ora et Labora</p>

        <div className="produtos-grid">
          {produtosData.map((produto) => {
            const titulo = produto.titulo || `Produto #${produto.id}`;
            const href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
              `Olá, gostaria de fazer o pedido do produto ${titulo}`,
            )}`;

            return (
              <div key={produto.id} className="produto-card">
                <div className="produto-img">
                  <img {...makeImageProps(produto.imagem, titulo)} loading="lazy" />
                </div>
                <div className="produto-body">
                  <h3 className="produto-title">{titulo}</h3>
                  {typeof produto.conteudo === 'number' && (
                    <p className="produto-price">R$ {produto.conteudo.toFixed(2)}</p>
                  )}
                  <a className="produto-cta" href={href} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart size={18} /> Fazer pedido <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
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
  );
};

export default Loja;
