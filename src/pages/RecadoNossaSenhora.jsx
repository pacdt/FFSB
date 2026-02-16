import { useCallback, useEffect, useMemo, useState } from 'react';
import './RecadoNossaSenhora.css';

function parseRecados(markdownText) {
  if (!markdownText) return [];

  return markdownText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (!match) return null;
      return match[1].trim();
    })
    .filter(Boolean);
}

const RecadoNossaSenhora = () => {
  const [status, setStatus] = useState('loading');
  const [recados, setRecados] = useState([]);
  const [recadoAtual, setRecadoAtual] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/recados.md', { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar recados');
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        const parsed = parseRecados(text);
        setRecados(parsed);
        setStatus(parsed.length ? 'ready' : 'empty');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const canPick = status === 'ready' && recados.length > 0;

  const pickRandom = useCallback(() => {
    if (!canPick) return;
    const idx = Math.floor(Math.random() * recados.length);
    setRecadoAtual(recados[idx] ?? null);
  }, [canPick, recados]);

  const textoExibido = useMemo(() => {
    if (status === 'loading') return 'Carregando recados...';
    if (status === 'error') return 'Não foi possível carregar os recados no momento.';
    if (status === 'empty') return 'Nenhum recado encontrado.';
    if (!recadoAtual) return '';
    return recadoAtual;
  }, [recadoAtual, status]);

  return (
    <div className="page-container recado-page">
      <section className="recado-hero">
        <div className="recado-hero-overlay" aria-hidden="true" />
        <h1 className="recado-hero-title">Recado de Nossa Senhora</h1>
      </section>

      <section className="recado-body">
        <div className="recado-card">
          {textoExibido ? (
            <p className="recado-text">"{textoExibido}"</p>
          ) : (
            <p className="recado-placeholder">
              Clique no botão para receber um recado.
            </p>
          )}

          <button
            type="button"
            className="recado-btn"
            onClick={pickRandom}
            disabled={!canPick}
          >
            Receber um recado
          </button>
        </div>
      </section>
    </div>
  );
};

export default RecadoNossaSenhora;
