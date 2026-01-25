import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './NewsBanner.css';

const NewsBanner = () => {
  return (
    <div className="news-banner">
      <div className="news-banner-container">
        <span className="news-tag">Novidade</span>
        <p className="news-text">
          Se você se sente chamado a Vida Contemplativa, venha trilhar o caminho Vocacional na nossa Fraternidade.
        </p>
        <Link to="https://abre.ai/inscricao-fffsb" target="_blank" rel="noopener noreferrer" className="news-link">
          Inscreva-se <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default NewsBanner;
