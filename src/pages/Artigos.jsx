import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Artigos.css';

import artigosData from '../assets/artigos.json';

const Artigos = () => {
  const articles = useMemo(() => [...artigosData].reverse(), []);

  return (
    <div className="page-container artigos-page">
      <h1 className="section-title">Artigos</h1>

      {articles.length === 0 ? (
        <p className="artigos-empty">Nenhum artigo disponível no momento.</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <Link to={`/artigo/${article.id}`} key={article.id} className="article-card-link">
              <div className="article-card">
                <div className="article-img-container">
                  <img src={article.imagem} alt={article.titulo} />
                </div>
                <div className="article-content">
                  <h3>{article.titulo}</h3>
                  <span className="read-more">Ler mais</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artigos;
