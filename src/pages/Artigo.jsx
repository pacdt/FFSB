import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import './Artigo.css';

// Importar JSON de artigos
import artigosData from '../assets/artigos.json';

const Artigo = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar artigo pelo ID
    const foundArticle = artigosData.find(a => a.id === parseInt(id));
    setArticle(foundArticle);
    setLoading(false);
  }, [id]);

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
            <span>Publicado recentemente</span>
          </div>
        </header>

        <div className="article-featured-image">
          <img src={article.imagem} alt={article.titulo} />
        </div>

        <div 
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.conteudo }}
        />
      </div>
    </div>
  );
};

export default Artigo;
