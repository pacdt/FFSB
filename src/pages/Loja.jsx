import React from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import './Loja.css';
import produtosData from '../assets/produtos.json';

const Loja = () => {
  const phone = '5579998789509';

  return (
    <div className="page-container loja-page">
      <h1 className="section-title">Nossa Loja</h1>

      <div className="loja-container">
        <p className="loja-subtitle">Artigos Religiosos Ora et Labora</p>

        <div className="produtos-grid">
          {produtosData.map((produto) => {
            const titulo = produto.titulo || `Produto #${produto.id}`;
            const href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
              `Olá, gostaria de fazer o pedido do produto ${titulo}`,
            )}`;

            return (
              <div key={produto.id} className="produto-card">
                <div className="produto-img">
                  <img src={produto.imagem} alt={titulo} loading="lazy" />
                </div>
                <div className="produto-body">
                  <h3 className="produto-title">{titulo}</h3>
                  {typeof produto.conteudo === 'number' && (
                    <p className="produto-price">R$ {produto.conteudo.toFixed(2)}</p>
                  )}
                  <a className="produto-cta" href={href} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart size={18} /> Fazer pedido <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Loja;

