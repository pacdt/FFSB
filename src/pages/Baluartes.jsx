import React from 'react';
import './Baluartes.css';

import bannerBaluartes from '../assets/img/banner-baluartes.png';

// URLs de imagens (usando links externos temporariamente onde os locais não estão claros ou para manter fidelidade ao legado)
// Em um projeto real, idealmente baixaríamos essas imagens para assets locais
const imgSaoBento = "https://4.bp.blogspot.com/-iCZmLpURhFg/XCVW7FB9ziI/AAAAAAAATA8/DqonD33f7KsNa4zS9yKrUzyegJ8DWbh0wCLcBGAs/s400/sao-bento.jpg";
const imgSaoBentoRegra = "https://2.bp.blogspot.com/-5GOiU8wNoLg/XCVW7HLYyaI/AAAAAAAATA4/e_wKpKw_68onRmSAf3UPDA-BM0k2kvjewCLcBGAs/s640/St_Benedict.jpg";
const imgMorteBento = "https://2.bp.blogspot.com/-YzGlSC8lKDY/XCVZIxyHeuI/AAAAAAAATBU/bFVdyaWKEkU6LxbbXggDaNdeZX0EfyA9ACLcBGAs/s400/Transporte%2Bde%2BBento.jpg";
const imgSantaEscolastica = "https://2.bp.blogspot.com/-eBENgym8FKY/XCVZczFeyuI/AAAAAAAATBc/T5r1hfK6x-gTStxTM2JxsMRCFUP8IKDUQCLcBGAs/s640/santa-escolastica2.jpg";
const imgDespedida = "https://www.pliniocorreadeoliveira.info/santa-scolastica%20sao%20Bento%20Subiaco.jpg";

const Baluartes = () => {
  return (
    <div className="page-container baluartes">
      <h1 className="section-title">Baluartes</h1>

      <section className="intro-card">
        <h2>São Bento, Santa Escolástica e a Virgem Santíssima</h2>
        <img src={bannerBaluartes} alt="Baluartes" className="intro-img" />
      </section>

      {/* Seção São Bento */}
      <section className="content-block">
        <h2 className="subsection-title">São Bento</h2>
        
        <div className="text-image-split">
          <div className="image-side">
            <img src={imgSaoBento} alt="São Bento" />
          </div>
          <div className="text-side">
            <p>
              São Bento é um grande santo da Igreja Católica, reconhecido como o Pai dos monges. 
              Nasceu na região de Núrsia na Itália. Foi um varão de vida venerável, bento pela graça e pelo nome, 
              pois desde cedo demonstrou ter uma sabedoria de homem plenamente maduro.
            </p>
            <p>
              Diante da realidade dos jovens estudantes de Roma que levavam uma vida movida pelos vícios, 
              Bento decidiu deixar os estudos e a casa dos pais para viver totalmente entregue a Jesus Cristo como monge.
            </p>
          </div>
        </div>

        <div className="full-width-block">
          <p>
            Ele buscou se refugiar num lugar deserto chamado Subiaco, isolou-se numa gruta pequena e ali permaneceu 
            durante 3 anos "escondido" de todos, exceto de um monge chamado Romano que o ajudou neste período.
          </p>
          
          <figure className="centered-figure">
            <img src={imgSaoBentoRegra} alt="São Bento Escrevendo a Santa Regra" />
            <figcaption>São Bento Escrevendo a Santa Regra para guiar os Monges</figcaption>
          </figure>

          <p>
            Após estes três anos de isolamento e oração, sua fama de santidade se espalhou. 
            Muitos começaram a sentir o desejo de viver como ele vivia, de ser seus filhos espirituais, 
            então daí nasceu a família dos monges beneditinos.
          </p>

          <div className="curiosity-box">
            <h4>Curiosidade</h4>
            <p>
              Pouco antes de ter a revelação de sua morte, o Homem de Deus teve a visão de um pequenino globo terrestre, 
              significando que para sua alma, o mundo e seus atrativos tornaram-se pequenos. 
              De fato, os grandes mestres da vida espiritual afirmam que <em>“quem venceu a si mesmo, é senhor do mundo”.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Seção Morte de São Bento */}
      <section className="content-block bg-alt">
        <h3 className="subsection-title">A Morte (O Transporte)</h3>
        <div className="text-image-split reverse">
          <div className="image-side">
            <img src={imgMorteBento} alt="Morte de São Bento" />
          </div>
          <div className="text-side">
            <p>
              Nós Beneditinos chamamos de <strong>TRANSPORTE</strong>, já que é a partir daqui que entramos na comunhão total e perfeita com Aquele que buscamos.
            </p>
            <p>
              O venerável Pai Bento foi avisado por Deus 6 dias antes de sua morte. 
              Pediu que seus irmãos o sustentassem em seus braços e lhe dessem a Comunhão Eucarística. 
              Logo após, deu seu último suspiro e adentrou o Céu.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Santa Escolástica */}
      <section className="content-block">
        <h2 className="subsection-title">Santa Escolástica</h2>
        
        <div className="text-image-split">
          <div className="image-side">
            <img src={imgSantaEscolastica} alt="Santa Escolástica" />
          </div>
          <div className="text-side">
            <p>
              Irmã gêmea de São Bento, nascida também em 480. Modelo de donzela cristã, Escolástica era piedosa, virtuosa e cultivava a oração.
            </p>
            <p>
              Sempre caminhou em uníssono com seu irmão. Quando soube que Bento fundara o mosteiro de Monte Cassino, 
              decidiu professar a mesma perfeição evangélica. Bento aceitou-a e mandou construir para ela uma cela, 
              dando origem à Ordem feminina das Beneditinas.
            </p>
          </div>
        </div>

        <div className="story-block">
          <h3>A Despedida</h3>
          <img src={imgDespedida} alt="Despedida de Bento e Escolástica" className="story-img" />
          
          <p>
            Era a primeira quinta-feira da Quaresma de 547. Pressentindo sua morte, Santa Escolástica pediu ao irmão:
          </p>
          
          <div className="dialogue-box">
            <p className="scholastica">“Peço-te, irmão, que não me deixes esta noite, para podermos falar até a manhã das alegrias da vida celeste.”</p>
            <p className="benedict">“Que é que dizes, irmã? Ficar fora do mosteiro, de modo nenhum o posso!”</p>
          </div>

          <p>
            Diante da recusa, Escolástica orou a Deus. Imediatamente, desabou uma tempestade tão violenta que Bento não pôde sair.
            Ele reclamou: <em>“Que Deus te perdoe, irmã! Que fizeste?”</em>. Ela respondeu: 
            <em> “Roguei a ti e não me ouviste; roguei ao meu Senhor e Ele ouviu-me.”</em>
          </p>
          
          <p>
            Assim, passaram toda a noite em vigília e santas conversas. Três dias depois, Bento viu a alma da irmã subir ao céu como uma pomba.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Baluartes;
