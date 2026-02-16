import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NewsBanner from './components/NewsBanner';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

const QuemSomos = lazy(() => import('./pages/QuemSomos'));
const Historico = lazy(() => import('./pages/Historico'));
const Baluartes = lazy(() => import('./pages/Baluartes'));
const Acoes = lazy(() => import('./pages/Acoes'));
const Contato = lazy(() => import('./pages/Contato'));
const Artigos = lazy(() => import('./pages/Artigos'));
const Artigo = lazy(() => import('./pages/Artigo'));
const Liturgia = lazy(() => import('./pages/Liturgia'));
const Doacoes = lazy(() => import('./pages/Doacoes'));
const Cronograma = lazy(() => import('./pages/Cronograma'));
const Localizacao = lazy(() => import('./pages/Localizacao'));
const Loja = lazy(() => import('./pages/Loja'));
const RecadoNossaSenhora = lazy(() => import('./pages/RecadoNossaSenhora'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <NewsBanner />
        <Header />
        <main className="main-content">
          <Suspense fallback={<div className="page-container">Carregando...</div>}>
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
              <Route path="/recado-nossa-senhora" element={<RecadoNossaSenhora />} />
              <Route path="/artigos" element={<Artigos />} />
              <Route path="/artigo/:id" element={<Artigo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
