import React, { useCallback, useEffect, useState } from 'react';
import { MapPin, Phone, Globe, Mail, ExternalLink } from 'lucide-react';
import './Contato.css';

// Imagens
import imgCasaMasculina from '../assets/img/contatos.jpeg';
import imgCasaFeminina from '../assets/img/qs-irmas.jpg';

const Contato = () => {
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

  const makeImageProps = (src, alt, className) => ({
    src,
    alt,
    className: className ? `${className} image-clickable` : 'image-clickable',
    role: 'button',
    tabIndex: 0,
    onClick: () => openModal(src, alt),
    onKeyDown: (event) => handleImageKeyDown(event, src, alt),
  });

  return (
    <div className="page-container contato">
      <h1 className="section-title">Contato e Localização</h1>

      <div className="contact-grid">
        {/* Casa Masculina */}
        <div className="contact-card">
          <div className="card-header">
            <h2>Casa Masculina</h2>
            <h3>Casa Recanto Subiaco</h3>
          </div>
          
          <img {...makeImageProps(imgCasaMasculina, 'Casa Masculina', 'contact-img')} />
          
          <div className="card-body">
            <div className="contact-item">
              <MapPin className="icon" size={24} />
              <div>
                <strong>Endereço:</strong>
                <p>Rua Juscelino de Jesus Gama, 494</p>
                <p>Povoado Cabrita, São Cristóvão - SE</p>
                <p>CEP: 49100-000</p>
                <a href="https://goo.gl/maps/7W6Tw8SYcTEa9Feb9" target="_blank" rel="noopener noreferrer" className="map-link">
                  Ver no Google Maps <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <Phone className="icon" size={24} />
              <div>
                <strong>Telefones:</strong>
                <p><a href="tel:79998789509">(79) 99878-9509</a></p>
                <p><a href="tel:79981314532">(79) 98131-4532</a></p>
              </div>
            </div>

            <div className="contact-item">
              <Mail className="icon" size={24} />
              <div>
                <strong>Email:</strong>
                <p><a href="mailto:comunidadeapostolicadesaobento@gmail.com">comunidadeapostolicadesaobento@gmail.com</a></p>
              </div>
            </div>

            <div className="contact-item">
                <Globe className="icon" size={24} />
                <div>
                    <strong>Caixa Postal:</strong>
                    <p>Caixa Postal: 1054</p>
                    <p>São Cristóvão - SE</p>
                    <p>CEP: 49.105-970</p>
                </div>
            </div>
          </div>
        </div>

        {/* Casa Feminina */}
        <div className="contact-card">
          <div className="card-header">
            <h2>Casa Feminina</h2>
            <h3>Casa Mãe da Piedade</h3>
          </div>
          
          <img {...makeImageProps(imgCasaFeminina, 'Casa Feminina', 'contact-img')} />
          
          <div className="card-body">
            <div className="contact-item">
              <MapPin className="icon" size={24} />
              <div>
                <strong>Endereço:</strong>
                <p>Rua Santa Rita, 100</p>
                <p>Bairro Guajará - Nossa Senhora do Socorro - SE</p>
                <p>CEP: 49160-000</p>
                <a href="https://goo.gl/maps/TLYLXpLqMjX384C26" target="_blank" rel="noopener noreferrer" className="map-link">
                  Ver no Google Maps <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <Phone className="icon" size={24} />
              <div>
                <strong>Telefone:</strong>
                <p><a href="tel:79988729748">(79) 98872-9748</a></p>
              </div>
            </div>
          </div>
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

export default Contato;
