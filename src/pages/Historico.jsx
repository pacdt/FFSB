import React, { useCallback, useEffect, useState } from 'react';
import './Historico.css';

// Import images
import imgIrmaoFrancisco1 from '../assets/img/h-if1.jpg';
import imgIrmaoFrancisco2 from '../assets/img/h-if2.jpg';
import imgVidaEucaristica from '../assets/img/h-ve.jpg';
const imgAdoracaoAntiga = 'https://1.bp.blogspot.com/-208CA--dYtU/XD9gN3D_iOI/AAAAAAAAUqg/HuxcRWYb9eAWIm5UBvHBCEdctqxNJZ6sACLcBGAs/s640/IMG_20190102_202737.jpg';
const imgFraternidade = 'https://4.bp.blogspot.com/-HroWcLbFFeM/XD9ly22B1yI/AAAAAAAAUqs/LtFfrOMNm6s83cSVDigsPsqpdI3zb6CzgCLcBGAs/s400/IMG_20190109_100021.jpg';
const imgConsagracao = 'https://2.bp.blogspot.com/-tD_ytEAMEWo/XD9stsZve7I/AAAAAAAAUrE/gBIyNmGNiTEcaK_0-Hi8LMnUFji5LaRBQCLcBGAs/s640/IMG_20190109_192754.jpg';

const Historico = () => {
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

  const makeImageProps = (src, alt, className) => ({
    src,
    alt,
    className: className ? `${className} image-clickable` : 'image-clickable',
    role: 'button',
    tabIndex: 0,
    onClick: () => openModal(src, alt),
    onKeyDown: (event) => handleImageKeyDown(event, src, alt),
  });

  return (
    <div className="page-container historico">
      <h1 className="section-title">Nosso Histórico</h1>

      <section className="quote-section">
        <blockquote>
          “Descobri que não nasci para viver sozinho, mas que deveria partilhar da minha vida com os irmãos.”
        </blockquote>
        <cite>— Irmão Francisco Vítima do Amor</cite>
      </section>

      <section className="content-block">
        <div className="text-image-wrap">
          <img {...makeImageProps(imgIrmaoFrancisco1, 'Irmão Francisco Vitima do Amor', 'float-img-right')} />
          <p>
            Esta bela frase do nosso querido e amado Pai Fundador, já revela uma das motivações que Deus colocou em seu coração
            para suscitar através dele este novo Carisma, pois, o Irmão Francisco fez esta grande e maravilhosa descoberta, como ele mesmo diz: 
            <em> <strong>“descobri que de nada valeria a experiência do amor de Deus, se não partilhar minha vida com outros...”</strong> </em>
            e isso faz lembrar a frase do salmista: 
            <em> <strong>“como é bom, como é suave os irmãos viverem juntos bem unidos”.</strong> </em>
            (Salmo 133, 1).
          </p>
        </div>
      </section>

      <section className="content-block">
        <div className="text-image-split">
          <div className="image-side">
             <img {...makeImageProps(imgIrmaoFrancisco2, 'Irmão Francisco Vitima do Amor', 'float-img-left')} />
          </div>
          <div className="text-side">
            <p>
              Não podemos falar da história da Comunidade São Bento sem falar do nosso querido Pai Fundador, pois, é na sua história
              que tudo começa. Desde cedo, a Santíssima Virgem Maria despertou nele o desejo de uma vida de oração e intimidade com Deus.
              Crescendo em estatura, sabedoria e graça, enquanto seus irmãos buscavam viver as coisas seculares, o Irmão Francisco sempre estava
              recolhido em oração no seu quarto, que transformou em um pequeno Santuário.
            </p>
            <p>
              Mais tarde, na vida em Comunidade, Jesus lhe fez o seguinte pedido:
            </p>
            <div className="highlight-text">
              “Em casa você venerava os santos nas imagens de barro, de gesso... agora Meu desejo é que você possa formar seus
              filhos espirituais para serem os novos santos e fazer da Comunidade São Bento um altar espiritual, uma Escola de Santidade".
            </div>
          </div>
        </div>
      </section>

      <section className="school-section">
        <h3>SCOLA DOMINI SERVITII</h3>
        <p className="subtitle">Escola do Serviço do Senhor</p>
        
        <div className="cards-container">
          <div className="info-card">
            <h4>1º ESCOLA</h4>
            <p>Partindo do ponto que ninguém nasceu sabendo e a própria vida é uma eterna escola. O objetivo é APRENDER, ser discípulos.</p>
          </div>
          <div className="info-card">
            <h4>2º SENHOR</h4>
            <p>O Senhor está no CENTRO de nossa vivência.</p>
          </div>
          <div className="info-card">
            <h4>3º SERVIÇO</h4>
            <p>O modo como queremos aprender é SERVINDO, imitando Nosso Senhor Jesus Cristo.</p>
          </div>
        </div>
      </section>

      <section className="content-block">
        <h2 className="subsection-title">Vida Eucarística</h2>
        <div className="centered-image-block">
            <img {...makeImageProps(imgVidaEucaristica, 'Vida Eucarística', 'featured-wide')} />
        </div>
        
        <p>
          Da mesma forma que sua mãe terrena o levou a Jesus, a Virgem Maria Mãe Celeste conduziu o Irmão Francisco a buscar
          a presença de Jesus na Eucaristia. Isso aconteceu de forma marcante em 2004, quando o Papa São João Paulo II proclamou o Ano Eucarístico.
        </p>
        
        <p>
          Neste período, Nosso Senhor concedeu ao Irmão Francisco a graça de se conscientizar que era necessário estar na presença de Jesus para ser moldado.
          Ele descreve esse processo como <em>“uma faxina, uma limpeza em que meu trabalho era apenas deixar, permitir que Deus trabalhasse”</em>.
        </p>

        <div className="text-image-split reverse margin-top">
          <div className="image-side">
             <img {...makeImageProps(imgAdoracaoAntiga, 'Adoração')} />
          </div>
          <div className="text-side">
            <p>
              Esse acontecimento foi um divisor de águas. Por isso, nosso Carisma é de <strong>Adoração ao Santíssimo Sacramento em reparação pela Santa Igreja e pelos Sacerdotes</strong>.
              Somos chamados de <em>Filhos e Filhas de São Bento do Coração Eucarístico de Jesus</em>.
            </p>
            <p>
              Todas as manhãs, o Corpo Eucarístico de Jesus é exposto para ser Adorado, e em meio a este Ato de Adoração as atividades cotidianas são desenvolvidas, 
              vivenciando o <strong>Ora et Labora</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block">
        <h2 className="subsection-title">A Fundação</h2>
        <p>
          Foi apenas no ano de 2008 que Nosso Senhor revelou e iluminou aos poucos ao Irmão Francisco o seu chamado.
          Muitas pessoas têm medo da vida fraterna, mas para o Irmão Francisco, a diversidade era motivo de entusiasmo.
          Ele sempre dizia: <strong>“o sonho de Deus é que o mundo seja uma grande Comunidade, porém, a gente precisa aprender a ser irmãos”.</strong>
        </p>
        
        <div className="centered-image-block">
            <img {...makeImageProps(imgFraternidade, 'Vida Fraterna', 'medium-img')} />
        </div>

        <p className="center-text">
          Começamos a fazer pequenas experiências concretas de vivência fraterna: dias juntos, retiros, tendo tudo em comum.
          Curiosamente, todos os jovens usavam a Cruz de São Bento, sinal que confirmou nosso Baluarte.
        </p>

        <div className="text-image-split margin-top">
          <div className="image-side">
             <img {...makeImageProps(imgConsagracao, 'Vida Fraterna')} />
          </div>
          <div className="text-side">
            <p>
              Em um momento de Adoração, Deus chamou: “Eu quero sua vida!”, e o Irmão Francisco respondeu prontamente.
            </p>
            <div className="highlight-box-small">
              <p>
                Em <strong>01 de julho de 2009</strong> demos o passo de morar na mesma casa e compartilhar de tudo 24 horas por dia.
              </p>
            </div>
            <p>
              Nossa finalidade: conduzir almas à Fonte inesgotável de Santidade, Jesus Cristo na Eucaristia.
            </p>
          </div>
        </div>
      </section>

      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} type="button">
              &times;
            </button>
            <img src={modalImage.src} alt={modalImage.alt} />
            <p className="modal-caption">{modalImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historico;
