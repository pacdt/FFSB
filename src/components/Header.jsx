import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo180 from '../assets/logo-180.webp';
import logo360 from '../assets/logo-360.webp';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img
            src={logo180}
            srcSet={`${logo180} 180w, ${logo360} 360w`}
            sizes="(max-width: 854px) 150px, 180px"
            alt="Filhos e Filhas de São Bento"
            className="logo"
            decoding="async"
          />
        </Link>

        <div className="header-divider" />

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Alternar menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/quem-somos" className={isActive('/quem-somos')} onClick={() => setIsMenuOpen(false)}>
                Quem Somos
              </Link>
            </li>
            <li>
              <Link to="/historico" className={isActive('/historico')} onClick={() => setIsMenuOpen(false)}>
                Histórico
              </Link>
            </li>
            <li>
              <Link to="/baluartes" className={isActive('/baluartes')} onClick={() => setIsMenuOpen(false)}>
                Baluartes
              </Link>
            </li>
            <li>
              <Link to="/acoes" className={isActive('/acoes')} onClick={() => setIsMenuOpen(false)}>
                Ações
              </Link>
            </li>
            <li>
              <Link to="/contato" className={isActive('/contato')} onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
