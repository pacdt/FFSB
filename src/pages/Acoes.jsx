import React, { useCallback, useEffect, useState } from 'react';
import './Acoes.css';
import imgAcaoPrincipal from '../assets/img/ac-1.jpeg';

// Imagens da galeria
import imgAcaoSocial1 from '../assets/img/acoes-img/acao-social1.jpeg';
import imgAcaoSocial2 from '../assets/img/acoes-img/acao-social2.jpeg';
import imgAparecida from '../assets/img/acoes-img/aparecida.jpeg';
import imgCatequese1 from '../assets/img/acoes-img/catequese1.jpeg';
import imgCatequese2 from '../assets/img/acoes-img/catequese2.jpeg';
import imgCatequese3 from '../assets/img/acoes-img/catequese3.jpeg';
import imgFatima1 from '../assets/img/acoes-img/fatima1.jpeg';
import imgFatima2 from '../assets/img/acoes-img/fatima2.jpeg';
import imgViaSacra1 from '../assets/img/acoes-img/via-sacra1.jpeg';

const galleryImages = [
  { src: imgAcaoSocial1, alt: "Ação Social" },
  { src: imgAcaoSocial2, alt: "Ação Social" },
  { src: imgAparecida, alt: "Festa de Nossa Senhora Aparecida" },
  { src: imgCatequese1, alt: "Catequese" },
  { src: imgCatequese2, alt: "Catequese" },
  { src: imgCatequese3, alt: "Catequese" },
  { src: imgFatima1, alt: "Nossa Senhora de Fátima" },
  { src: imgFatima2, alt: "Nossa Senhora de Fátima" },
  { src: imgViaSacra1, alt: "Via Sacra" },
];

const Acoes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIndex(index);
  };

  const closeModal = useCallback(() => {
    setModalIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    setModalIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setModalIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  }, []);

  useEffect(() => {
    if (modalIndex !== null) return;

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, [modalIndex]);

  useEffect(() => {
    if (modalIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalIndex, closeModal, goPrev, goNext]);

  useEffect(() => {
    if (modalIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalIndex]);

  const selectedImage = modalIndex === null ? null : galleryImages[modalIndex];

  return (
    <div className="page-container acoes">
      <h1 className="section-title">Ações Evangelizadoras</h1>

      <section className="intro-section">
        <h2 className="highlight-title">Necessitamos de uma NOVA EVANGELIZAÇÃO!!!</h2>
        
        <div className="text-image-split">
            <div className="image-side">
                <img src={imgAcaoPrincipal} alt="Ação Evangelizadora" className="main-img" decoding="async" />
            </div>
            <div className="text-side">
                <p>
                  Este foi o grande clamor e a descoberta da Santa Madre Igreja por meio de seus Pastores em meados do século XX.
                  Em resposta a esta necessidade de evangelizar o homem moderno e trazê-lo de volta para Deus, 
                  o Espírito Santo suscitou em todo mundo os Novos Carismas, a Primavera da Igreja.
                </p>
                <p>
                  O Espírito Santo que suscitou este novo Carisma dos Filhos e Filhas de São Bento 
                  também têm lhe inspirado algumas ações para que a nossa Fraternidade possa contribuir com a Nova Evangelização.
                </p>
            </div>
        </div>
      </section>

      <section className="content-block">
        <h3>Comunidade de Comunidades</h3>
        <p>
            Conforme documento 100 de Aparecida, a comunidade de comunidades é lugar da escuta da Palavra de Deus, 
            é a formação de seus membros para evangelizar.
        </p>
        <blockquote className="quote-box">
            "Este exercício pastoral mostra o rosto de Mãe da Igreja, que gera, amamenta, faz crescer, corrige, 
            alimenta e conduz pela mão seus filhos, impulsionando-os a evangelizar e testemunhar a alegria do Evangelho."
            <cite>- Papa Francisco</cite>
        </blockquote>
        <p>
            Nosso Fundador afirma que é "o encontro do Cristo Ressuscitado com o Cristo Crucificado que está nos irmãos necessitados".
        </p>
      </section>

      <section className="gallery-section">
        <h3>Galeria de Fotos</h3>
        <p className="instruction">Clique nas imagens para ampliar</p>
        
        <div className="gallery-carousel" aria-label="Carrossel de fotos">
          <div className="carousel-viewport">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {galleryImages.map((img, index) => (
                <button
                  key={img.src}
                  type="button"
                  className="carousel-slide gallery-item"
                  onClick={() => openModal(index)}
                  aria-label={`Abrir imagem: ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  <div className="overlay">
                    <span>Ver mais</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Imagem */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} type="button">
              &times;
            </button>

            <button className="modal-nav-btn modal-prev" onClick={goPrev} type="button" aria-label="Voltar foto">
              ‹
            </button>
            <button className="modal-nav-btn modal-next" onClick={goNext} type="button" aria-label="Avançar foto">
              ›
            </button>

            <img src={selectedImage.src} alt={selectedImage.alt} decoding="async" />
            <p className="modal-caption">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Acoes;
