import React, { useCallback, useEffect, useState } from 'react';
import './QuemSomos.css';

// Import images
import imgMontagem from '../assets/img/qs-montagem.png';
import imgIrmaos from '../assets/img/qs-irmaos.jpg';
import imgIrmas from '../assets/img/qs-irmas.jpg';
import imgComunidade1 from '../assets/img/qs-comunidade1.jpg';
import imgComunidade2 from '../assets/img/qs-comunidade2.jpg';
import imgComunidade3 from '../assets/img/qs-comunidade3.jpg';
import imgLiturgia from '../assets/img/qs-liturgia.jpg';
import imgAdoracao from '../assets/img/qs-adoracao.jpg';
import imgEspiritualidade from '../assets/img/qs-espiritualidade.jpg';
import imgTrabalho from '../assets/img/qs-trabalho.jpg';
import imgTrabalho2 from '../assets/img/qs-trabalho2.jpg';

const QuemSomos = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = useCallback((src, alt) => {
    setModalImage({ src, alt });
  }, []);

  const closeModal = useCallback(() => {
    setModalImage(null);
  }, []);

  const handleImageKeyDown = useCallback(
    (event, src, alt) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(src, alt);
      }
    },
    [openModal],
  );

  useEffect(() => {
    if (!modalImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage, closeModal]);

  useEffect(() => {
    if (!modalImage) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalImage]);

  const makeImageProps = (src, alt, className, options = {}) => ({
    src,
    alt,
    className: className ? `${className} image-clickable` : 'image-clickable',
    loading: options.loading ?? 'lazy',
    decoding: 'async',
    fetchpriority: options.fetchPriority,
    role: 'button',
    tabIndex: 0,
    onClick: () => openModal(src, alt),
    onKeyDown: (event) => handleImageKeyDown(event, src, alt),
  });

  return (
    <div className="page-container quem-somos">
      <h1 className="section-title">Quem Somos?</h1>

      <section className="intro-section">
        <img {...makeImageProps(imgMontagem, 'Comunidade FFSB', 'featured-img', { loading: 'eager', fetchPriority: 'high' })} />
        
        <div className="text-content">
          <p>
            Somos os Filhos e Filhas de São Bento do Coração Eucarístico de Jesus,
            uma Fraternidade de Vida Religiosa com Ramo Masculino, Feminino e
            Leigos Consagrados, fundada na Arquidiocese de Aracaju, que vive o
            seguimento de Cristo a partir das diretrizes e orientações da
            Espiritualidade Beneditina.
          </p>
          <p>
            Também vivemos diariamente da Adoração ao Santíssimo Sacramento, pois, nosso Pai Fundador Abba Francisco fez
            essa preciosa descoberta, de que <strong>Jesus na Santíssima Eucaristia é a fonte inesgotável de santidade</strong>, e nos ensina com a seguinte afirmação:
          </p>
          <blockquote className="quote">
            “Na adoração buscamos preencher nosso interior da presença de Jesus
            Ressuscitado, para ir ao encontro do Cristo crucificado que está nos
            irmãos necessitados, daqueles que são pobres dos bens espirituais e
            materiais".
          </blockquote>
          <p>
            Assim tentamos dar uma resposta ao apelo da Igreja, que na pessoa do
            nosso querido Papa Francisco, vem pedindo uma Igreja em saída, em
            direção às periferias existenciais e geográficas.
          </p>
        </div>
      </section>

      <section className="content-section">
        <h2 className="subsection-title">Vida Religiosa</h2>
        <p>
          É formada por irmãos e irmãs que se consagram realizando a Oblação
          conforme a Regra de São Bento e buscam responder radicalmente ao
          chamado de Jesus por meio de uma vida evangélica, ofertando
          integralmente sua vida a Deus, por meio da profissão solenemente dos
          Votos de Obediência, Estabilidade e Santidade.
        </p>
        <div className="image-grid two-columns">
          <img {...makeImageProps(imgIrmaos, 'Irmãos da Comunidade')} />
          <img {...makeImageProps(imgIrmas, 'Irmãs da Comunidade')} />
        </div>
      </section>

      <section className="content-section">
        <h2 className="subsection-title">Leigos Consagrados</h2>
        <p>
          São pessoas de vida secular, casais, solteiros que se unem ao Carisma
          da Fraternidade por meio da Oração Litúrgica, e se consagram a Nosso
          Senhor Jesus Cristo, fazendo solenemente e renovando anualmente a
          Oblação com Voto de Serviço a Deus, por meio da Fraternidade.
        </p>
        <div className="image-grid three-columns">
          <img {...makeImageProps(imgComunidade1, 'Comunidade Leiga 1')} />
          <img {...makeImageProps(imgComunidade2, 'Comunidade Leiga 2')} />
          <img {...makeImageProps(imgComunidade3, 'Comunidade Leiga 3')} />
        </div>
      </section>

      <section className="content-section highlight-bg">
        <div className="text-image-split">
          <div className="text-side">
            <h2 className="subsection-title">Carisma</h2>
            <p>
              A partir dos ensinamentos do nosso Venerável Pai São Bento nosso
              <strong> Carisma é viver a busca de Deus seguindo os passos do Cristo Obediente, essa é a vocação do monge.</strong>
            </p>
            <p>
              E assim como São Bento na Regra diz ao monges: <strong>NADA ANTEPOR AO OFÍCIO DIVINO</strong> (Cap. 43, 3 RSB) nós
              buscamos manter a fidelidade à Liturgia das Horas rezando diante do
              Santíssimo Sacramento. Pois, nosso Abba, o Irmão Francisco sempre nos
              ensina e deixa claro que tudo que existe e é inspirado a ser feito na
              nossa Fraternidade é fruto da presença de Jesus Eucarístico em nosso
              meio.
            </p>
          </div>
          <div className="image-side">
            <img {...makeImageProps(imgLiturgia, 'Liturgia')} />
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="text-image-split reverse">
          <div className="text-side">
            <h2 className="subsection-title">Finalidade</h2>
            <p>
              Conduzir o maior número de almas à Fonte inesgotável de Santidade, que
              é Jesus Cristo presente na Santa Eucaristia, a partir da experiência
              de nosso Pai Fundador e conforme o CIC 1324: A Eucaristia é “fonte e
              ápice de toda a vida cristã”, na santíssima Eucaristia está contido
              todo o tesouro espiritual da Igreja, isto é, o próprio Cristo.
            </p>
          </div>
          <div className="image-side">
            <img {...makeImageProps(imgAdoracao, 'Adoração')} />
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="subsection-title">Espiritualidade Beneditina</h2>
        <p>
          Como ensina nosso Pai Bento a vida do monge se sustenta no seu
          principal lema: Ora et Labora: oração e trabalho. Por isso nosso dia a
          dia é vivido com Adoração, Oração, estudo e trabalho.
        </p>
        <p>
          A Tradição Monástica diz que Bento na sua grande sabedoria, para
          santificar a vida dos monges dividiu as horas do dia em três partes:
        </p>
        
        <div className="hours-card">
          <p>8 horas de <strong>Oração</strong></p>
          <p>8 horas de <strong>Trabalho</strong></p>
          <p>8 horas de <strong>Descanso</strong></p>
          <div className="divider"></div>
          <p className="result">Resultado = 24 horas da Vida de um Monge</p>
        </div>

        <img {...makeImageProps(imgEspiritualidade, 'Espiritualidade', 'full-width-img')} />
        
        <figure className="image-grid two-columns">
          <img {...makeImageProps(imgTrabalho, 'Trabalho monástico')} />
          <img {...makeImageProps(imgTrabalho2, 'Trabalho monástico')} />
          <figcaption>Nosso trabalho é também oração.</figcaption>
        </figure>

        <div className="text-block">
          <p>
            Sendo que a característica mais marcante da Oração fica com o louvor
            elevado aos Céus por meio dos Salmos: O SALMODIAR! Assim, podemos
            afirmar que o monge vive dos Salmos, pois, cantar os Salmos é cantar
            Nosso Senhor Jesus Cristo! E junto ao lema de São Bento que orienta
            nossas vidas, o Irmão Francisco Vítima do Amor, nosso Fundador pelas
            experiências desses poucos anos tem classificado a Comunidade como a
            Escola do Serviço do Senhor:
          </p>
          
          <div className="highlight-box">
            <h3>Schola Dominici Servitii – Escola do Serviço do Senhor</h3>
            <p><strong>Escola (Schola):</strong> Partindo do ponto que ninguém nasceu sabendo e a própria vida é uma eterna escola. Que todos se conscientizem que o objetivo de todos os membros da Comunidade São Bento é aprender.</p>
            <p><strong>Serviço (Servitii):</strong> O modo como queremos aprender é SERVINDO, imitando Nosso Senhor Jesus Cristo, que disse: Eu vim para servir e não para ser servido.</p>
            <p><strong>Senhor (Dominici):</strong> O senhor é o CENTRO de nossa vivência. Nós aprendemos com Jesus; na Escola de Jesus; e o serviço que exercemos é para Jesus, para a Glória do Senhor.</p>
          </div>
        </div>
      </section>

      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} type="button">
              &times;
            </button>
            <img src={modalImage.src} alt={modalImage.alt} decoding="async" />
            <p className="modal-caption">{modalImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuemSomos;
