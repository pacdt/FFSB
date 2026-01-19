import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Artigos.css';

import artigosData from '../assets/artigos.json';

const coverAssetUrls = import.meta.glob('../content/articles/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const coverAssetUrlByPath = new Map(Object.entries(coverAssetUrls));

function resolveArtigoImagemUrl(article) {
  const reference = article?.imagem;
  if (!reference || typeof reference !== 'string') return reference;

  if (reference.startsWith('http://') || reference.startsWith('https://')) return reference;
  if (reference.startsWith('/')) return reference;

  if (reference.startsWith('articles/')) {
    const key = `../content/${reference}`;
    return coverAssetUrlByPath.get(key) || reference;
  }

  return reference;
}

const Artigos = () => {
  const articles = useMemo(
    () => [...artigosData].sort((a, b) => (a?.id ?? Number.MAX_SAFE_INTEGER) - (b?.id ?? Number.MAX_SAFE_INTEGER)),
    [],
  );

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
                  <img src={resolveArtigoImagemUrl(article)} alt={article.titulo} />
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
