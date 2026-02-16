import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';
import whatsappLogo from '../assets/whatsapp.png';

const Footer = () => {
  const whatsappHref =
    'https://api.whatsapp.com/send?phone=5579998789509&text=Ol%C3%A1%20Filhos%20de%20S%C3%A3o%20Bento!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es';

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-infos">
          <div className="logo-footer-wrap">
            <img className="logo-footer" src={logo} alt="Logo" loading="lazy" decoding="async" />
          </div>
          <div className="footer-text">
            <h4>Filhos e Filhas de São Bento do Coração Eucarístico de Jesus</h4>
            <p>
              Abba: <strong>Irmão Francisco Vítima do Amor</strong>
            </p>
            <a href="tel:79981314532">(79) 98131-4532</a>
            <br />
            <a href="tel:79998789509">(79) 99878-9509</a>
            <br />
            <br />
            <address>
              Rua Juscelino de Jesus Gama, 494, Pov. Cabrita, São Cristóvão - SE, 49100-000
            </address>
            <br />
            <h5>Entre em Contato via WhatsApp</h5>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              <img className="whatsapp-logo" src={whatsappLogo} alt="WhatsApp Logo" loading="lazy" decoding="async" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom" id="credits">
        <h6>
          Todos os Direitos Reservados para os <strong>Filhos e Filhas de São Bento do Coração Eucarístico de Jesus</strong> - Site
          Criado por <a href="https://pacdt.github.io/Projetos-Links/" target="_blank" rel="noopener noreferrer">Mateus Santos</a>
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
