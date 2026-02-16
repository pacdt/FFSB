import React from 'react';
import { CalendarDays, Clock, ExternalLink } from 'lucide-react';
import './Cronograma.css';

const Cronograma = () => {
  const whatsappHref =
    'https://api.whatsapp.com/send?phone=5579998789509&text=Ol%C3%A1%20Filhos%20de%20S%C3%A3o%20Bento!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es';

  return (
    <div className="page-container cronograma-page">
      <h1 className="section-title">Cronograma</h1>

      <div className="cronograma-container">
        <div className="cronograma-card">
          <div className="cronograma-card-header">
            <CalendarDays size={22} />
            <h2>Próximo Evento</h2>
          </div>
          <p className="cronograma-muted">Retiro de Carnaval para Rapazes, de 14/02 à 17/02 de 2026 com Missas às 11h aberta à cominudade.</p>
        </div>

        <div className="cronograma-card">
          <div className="cronograma-card-header">
            <Clock size={22} />
            <h2>Visitas</h2>
          </div>
          <p>Terça à Domingo das 14h às 17h</p>
          <p className="cronograma-muted">
            Agendamento via{' '}
            <a className="cronograma-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp <ExternalLink size={16} />
            </a>
          </p>
        </div>

        <div className="cronograma-card">
          <div className="cronograma-card-header">
            <Clock size={22} />
            <h2>Celebração da Palavra</h2>
          </div>
          <p>De Segunda à Sexta às 07h</p>
          <p className="cronograma-muted">(Podendo haver mudança sem aviso prévio)</p>
        </div>
      </div>
    </div>
  );
};

export default Cronograma;

