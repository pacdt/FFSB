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
