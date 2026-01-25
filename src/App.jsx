import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import Historico from './pages/Historico';
import Baluartes from './pages/Baluartes';
import Acoes from './pages/Acoes';
import Contato from './pages/Contato';
import Artigos from './pages/Artigos';
import Artigo from './pages/Artigo';
import Liturgia from './pages/Liturgia';
import Doacoes from './pages/Doacoes';
import Cronograma from './pages/Cronograma';
import Localizacao from './pages/Localizacao';
import Loja from './pages/Loja';
import NotFound from './pages/NotFound';
import './App.css';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function App() {
  const [imageModal, setImageModal] = useState(null);

  useEffect(() => {
    const onClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!target.closest('.page-container')) return;
      if (target.closest('a')) return;
      if (target.closest('button')) return;
      const src = target.currentSrc || target.src;
      if (!src) return;
      event.preventDefault();
      setImageModal({ src, alt: target.alt || '' });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!imageModal) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setImageModal(null);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [imageModal]);

  return (
    <Router>
      <div className="app-container">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/baluartes" element={<Baluartes />} />
            <Route path="/acoes" element={<Acoes />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/liturgia" element={<Liturgia />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="/localizacao" element={<Localizacao />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/artigo/:id" element={<Artigo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {imageModal ? (
          <div className="image-modal-overlay" onClick={() => setImageModal(null)}>
            <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="image-modal-close" onClick={() => setImageModal(null)}>
                ×
              </button>
              <img src={imageModal.src} alt={imageModal.alt} />
            </div>
          </div>
        ) : null}
      </div>
    </Router>
  );
}

export default App;
