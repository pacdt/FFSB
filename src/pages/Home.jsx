import React, { useState, useEffect } from 'react';
import './Home.css';
import bannerHero from '../assets/img/banner-hero.png';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Heart, ShoppingBag, CalendarDays } from 'lucide-react';

import artigosData from '../assets/artigos.json';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Carregar os artigos e inverter a ordem para mostrar os mais recentes primeiro
    // Pegar apenas os 3 últimos
    const sortedArticles = [...artigosData].reverse().slice(0, 3);
    setArticles(sortedArticles);
  }, []);

  return (
    <div className="home">
      <section className="hero-banner">
        <img src={bannerHero} alt="Filhos e Filhas de São Bento" className="banner-img" />
        <div className="hero-overlay" aria-hidden="true" />
        <h2 className="hero-title">Filhos e Filhas de São Bento do Coração Eucarístico de Jesus</h2>
      </section>

      <section className="quick-access">
        <h2>Acesso Rápido</h2>
        <div className="access-grid">
          <Link to="/liturgia" className="access-card-link">
            <div className="access-card">
              <BookOpen className="card-icon" size={40} />
              <h3>Liturgia Diária</h3>
              <p>Acompanhe as leituras do dia</p>
            </div>
          </Link>
          
          <Link to="/localizacao" className="access-card-link">
            <div className="access-card">
              <MapPin className="card-icon" size={40} />
              <h3>Localização</h3>
              <p>Venha nos visitar</p>
            </div>
          </Link>
          
          <Link to="/doacoes" className="access-card-link">
            <div className="access-card">
              <Heart className="card-icon" size={40} />
              <h3>Doações</h3>
              <p>Ajude nossa obra</p>
            </div>
          </Link>
          
          <Link to="/loja" className="access-card-link">
            <div className="access-card">
              <ShoppingBag className="card-icon" size={40} />
              <h3>Loja</h3>
              <p>Adquira nossos produtos</p>
            </div>
          </Link>

          <Link to="/cronograma" className="access-card-link">
            <div className="access-card">
              <CalendarDays className="card-icon" size={40} />
              <h3>Cronograma</h3>
              <p>Confira nossos horários e eventos</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="latest-articles">
        <h2>Últimos Artigos</h2>
        
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
      </section>
    </div>
  );
};

export default Home;
