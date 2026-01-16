import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="page-container notfound-page">
      <div className="notfound-card">
        <h1>Página não encontrada</h1>
        <p>O endereço acessado não existe ou foi movido.</p>
        <Link to="/" className="notfound-link">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

