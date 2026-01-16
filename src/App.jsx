import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import Historico from './pages/Historico';
import Baluartes from './pages/Baluartes';
import Acoes from './pages/Acoes';
import Contato from './pages/Contato';
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
            <Route path="/artigo/:id" element={<Artigo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
