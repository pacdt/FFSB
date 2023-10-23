function criarCards(dadosDosCards) {
	var cardsContainer = document.getElementById("cards");

	dadosDosCards.forEach(function (cardData) {
		var cardElement = document.createElement("div");
		cardElement.classList.add("card-produto");
		// cardElement.style.background = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('" + cardData.imagem + "') no-repeat center/cover";
		var imgProduct = document.createElement("img");
        imgProduct.src = cardData.imagem;

		var tituloElement = document.createElement("h4");
		tituloElement.textContent = cardData.titulo;

        var descriptionElement = document.createElement("p");
		descriptionElement.textContent = "R$ " + cardData.conteudo;

        var buyButton = document.createElement("a");
        buyButton.innerHTML = `
		<button>Fazer pedido</button>
		`
		buyButton.href = `https://api.whatsapp.com/send?phone=5579998789509&text=Olá, gostaria de fazer o pedido do produto ${cardData.titulo}`
		buyButton.target = "_blank"

        
        cardElement.appendChild(imgProduct);
		cardElement.appendChild(tituloElement);
        cardElement.appendChild(descriptionElement);
        cardElement.appendChild(buyButton);
		cardsContainer.appendChild(cardElement);
	});
}

fetch("../produtos.json") // Carregar o arquivo JSON
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		criarCards(data); // Chamar a função criarCards com os dados do JSON
	})
	.catch(function (error) {
		console.error("Erro ao carregar o arquivo JSON:", error);
	});