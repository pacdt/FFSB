import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import './Localizacao.css';

const Localizacao = () => {
  const mapsHref = 'https://goo.gl/maps/ufFsMhtCMfo3tKoF9';
  const embedSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.3837405233799!2d-37.132993315665786!3d-10.96216816486656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71aafea15c62db1%3A0x745724ec988a2b01!2sFilhos%20e%20Filhas%20de%20S%C3%A3o%20Bento%20do%20Cora%C3%A7%C3%A3o%20Eucar%C3%ADstico%20de%20Jesus!5e0!3m2!1spt-BR!2sbr!4v1692871671052!5m2!1spt-BR!2sbr';

  return (
    <div className="page-container localizacao-page">
      <h1 className="section-title">Localização</h1>

      <div className="localizacao-container">
        <div className="localizacao-card">
          <div className="localizacao-card-header">
            <MapPin size={22} />
            <h2>Como nos encontrar?</h2>
          </div>

          <div className="map-frame">
            <iframe
              src={embedSrc}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa - Filhos e Filhas de São Bento"
            />
          </div>

          <div className="localizacao-actions">
            <a className="maps-link" href={mapsHref} target="_blank" rel="noopener noreferrer">
              Abrir no Google Maps <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localizacao;

