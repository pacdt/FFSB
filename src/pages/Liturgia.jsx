import React, { useEffect, useState } from 'react';
import './Liturgia.css';

const LITURGIA_URL = 'https://pacdt.github.io/Liturgia-diaria/';

const Liturgia = () => {
  const [html, setHtml] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(LITURGIA_URL);
        const text = await response.text();
        setHtml(text);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };

    load();
  }, []);

  return (
    <div className="page-container liturgia-page">
      <h1 className="section-title">Liturgia Diária</h1>

      {status === 'loading' && <p className="liturgia-status">Carregando...</p>}
      {status === 'error' && (
        <p className="liturgia-status">
          Não foi possível carregar a Liturgia agora. Tente novamente mais tarde.
        </p>
      )}

      {status === 'ready' && (
        <div className="liturgia-content" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  );
};

export default Liturgia;

