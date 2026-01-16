import React from 'react';
import { HeartHandshake, CreditCard, Copy, ExternalLink } from 'lucide-react';
import './Doacoes.css';

const Doacoes = () => {
  const pixKey = '44.918.083/0001-78';
  const whatsappHref =
    'https://api.whatsapp.com/send?phone=5579998789509&text=Ol%C3%A1%20Filhos%20de%20S%C3%A3o%20Bento!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es';

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
    } catch {
    }
  };

  return (
    <div className="page-container doacoes-page">
      <h1 className="section-title">Doações</h1>

      <div className="doacoes-hero">
        <HeartHandshake size={40} />
        <p>Deus ama quem dá com alegria! (II Cor 9, 7)</p>
      </div>

      <div className="doacoes-grid">
        <div className="doacao-card">
          <div className="doacao-card-header">
            <CreditCard size={22} />
            <h2>Pix</h2>
          </div>
          <div className="doacao-card-body">
            <p className="label">Chave Pix</p>
            <div className="pix-row">
              <span className="pix-key">{pixKey}</span>
              <button type="button" className="pix-copy" onClick={copyPix}>
                <Copy size={18} />
              </button>
            </div>
            <p>
              Beneficiário: <strong>Associação Filhos e Filhas de São Bento</strong>
            </p>
            <p>
              Banco: <strong>Banco do Brasil</strong>
            </p>
          </div>
        </div>

        <div className="doacao-card">
          <div className="doacao-card-header">
            <CreditCard size={22} />
            <h2>Banco do Brasil</h2>
          </div>
          <div className="doacao-card-body">
            <p>
              Agência: <strong>1603-9</strong>
            </p>
            <p>
              Conta Corrente: <strong>74094-2</strong>
            </p>
            <p>
              Beneficiário: <strong>Associação Filhos e Filhas de São Bento</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="doacoes-footer">
        <p>Para outras formas de doações, entre em contato via WhatsApp.</p>
        <a className="whats-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          Abrir WhatsApp <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default Doacoes;

