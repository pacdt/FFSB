<script>
      // Carrega os dados do arquivo JSON
      fetch("https://liturgiadiaria.site/")
        .then((response) => response.json())
        .then((data) => {
          // Exibe os dados da liturgia na página

          document.getElementById("data").textContent = data.data;
          document.getElementById("primeiraLeitura").innerHTML = `
					<h3>
					<span id="semana">${data.liturgia}</span> <span><br></span> Cor:
					<span id="cor">${data.cor}</span>
					</h3>
					<h3 class="txt-titulo">Primeira Leitura</h3>
					<h3>
						<span id="titulo">${data.primeiraLeitura.titulo}</span> <span id="referencia">(${data.primeiraLeitura.referencia})</span>
					</h3>
					<p id="conteudo">${data.primeiraLeitura.texto}</p>
					`;

          // Alternar cor de acordo com o Tempo
          let cor = data.cor;
          if (cor == "Branco") {
            document.getElementById("cor").style.color = "#fff";
          }
          if (cor == "Verde") {
            document.getElementById("cor").style.color = "#00A652";
          }
          if (cor == "Roxo") {
            document.getElementById("cor").style.color = "#B01CEE";
          }
          if (cor == "Vermelho") {
            document.getElementById("cor").style.color = "#ED1B24";
          }
          if (cor == "Rosa") {
            document.getElementById("cor").style.color = "#F7B8D7";
          }

          if (data.segundaLeitura == "Não há segunda leitura hoje!") {
            document.getElementById("segLeitura").innerHTML = `
					<h3 class="txt-titulo">Segunda Leitura</h3>
					<p>Não há segunda leitura hoje!</p>
						`;
          } else {
            document.getElementById("segundaLeitura").innerHTML = `
						<h3 class="txt-titulo">Segunda Leitura</h3>
						<h3>
						<span id="titulo2"></span> <span id="referencia2"></span>
						</h3>
						<p id="conteudo2"></p>

						`;
            document.getElementById(
              "referencia2"
            ).textContent = `( ${data.segundaLeitura.referencia} )`;
            document.getElementById("titulo2").textContent =
              data.segundaLeitura.titulo;
            document.getElementById("conteudo2").innerHTML =
              data.segundaLeitura.texto;
          }

          document.getElementById("salmo").innerHTML = `
				<h3 class="txt-titulo">Salmo</h3>
				<h3>
					<span id="titulo-s">${data.salmo.refrao}</span>
					<span id="referencia-s">(${data.salmo.referencia})</span>
				</h3>
				<p id="conteudo-s">${data.salmo.texto}</p>
				`;

          document.getElementById("evangelho").innerHTML = `
				<h3 class="txt-titulo">Evangelho</h3>
					<h3>
						<span id="titulo-e">${data.evangelho.titulo}</span>
						<span id="referencia-e">(${data.evangelho.referencia})</span>
					</h3>
					<p id="conteudo-e">${data.evangelho.texto}</p>
				`;
        });
    </script>