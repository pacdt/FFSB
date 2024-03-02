function criarCards(dadosDosCards) {
	var cardsContainer = document.getElementById("cards");

	dadosDosCards.forEach(function (cardData) {
		var cardElement = document.createElement("div");
		cardElement.classList.add("artigo-card");
		cardElement.style.background = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('" + cardData.imagem + "') no-repeat center/cover";
		cardElement.onclick = function () {
			verArtigo(cardData.id);
		};

		var tituloElement = document.createElement("h4");
		tituloElement.textContent = cardData.titulo;

		cardElement.appendChild(tituloElement);
		cardsContainer.appendChild(cardElement);
	});
}

fetch("artigos.json") // Carregar o arquivo JSON
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		criarCards(data); // Chamar a função criarCards com os dados do JSON
	})
	.catch(function (error) {
		console.error("Erro ao carregar o arquivo JSON:", error);
	});


	function injectHtml(htmlCode, targetSelector) {
		const targetElement = document.querySelector(targetSelector);
		if (targetElement) {
			targetElement.innerHTML = htmlCode;
		} else {
			console.error('Elemento alvo não encontrado com o seletor:', targetSelector);
		}
	}
	
const meuFooter = `
<div id="infos">
    <img class="logo-footer" src="../assets/logo.png" alt="Logo" />
    <div>
      <br />
      <h4>Filhos e Filhas de São Bento do Coração Eucarístico de Jesus</h4>
      <p>Abba: <strong>Irmão Francisco Vítima do Amor</strong></p>
      <a href="tel:79981314532">(79) 98131-4532</a>
      <br />
      <a href="tel:79998789509">(79) 99878-9509</a>
      <br />
      <br />
      <address>
        Rua Juscelino de Jesus Gama, 494, Pov. Cabrita, São Cristóvão - SE,
        49100-000
      </address>
      <br />
      <h5>Entre em Contato via WhatsApp</h5>
      <a
        href="https://api.whatsapp.com/send?phone=5579998789509&text=Ol%C3%A1%20Filhos%20de%20S%C3%A3o%20Bento!%20Gostaria%20de%20mais%20inorma%C3%A7%C3%B5es"
      >
        <img
          class="whatsapp-logo"
          src="../assets/whatsapp.png"
          alt="WhatsApp Logo"
        />
      </a>
    </div>
  </div>
  <div></div>
`;
const meusCreditos = `
<h6>
    Todos os Direitos Reservados para os
    <strong>
      Filhos e Filhas de São Bento do Coração Eucarístico de Jesus
    </strong>
    - Site Criado por
    <a href="https://pacdt.github.io/Projetos-Links/">Mateus Santos</a>
  </h6>
`

injectHtml(meuFooter, 'footer');
injectHtml(meusCreditos, '#credits');
	