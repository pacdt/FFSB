const comunidades = [
    // Acoes Evangelizadoras = Acao Social
    "../assets/img/acoes-img/acao-social1.jpeg", //0
    "../assets/img/acoes-img/acao-social2.jpeg", //1
    // Visita de Nossa Senhora de Fátima
    "../assets/img/acoes-img/fatima1.jpeg", //2
    "../assets/img/acoes-img/fatima2.jpeg", //3
    // Procissão com Nossa Senhora Aparecida
    "../assets/img/acoes-img/aparecida.jpeg", //4
    // Via Sacra
    "../assets/img/acoes-img/via-sacra1.jpeg", //5
    // Formação Catequese
    "../assets/img/acoes-img/catequese1.jpeg", //6
    "../assets/img/acoes-img/catequese2.jpeg", //7
    "../assets/img/acoes-img/catequese3.jpeg", //8
];

var indiceAtual = 0;
const legenda = document.querySelector("#lgd");
// legenda.innerHTML = "Ações Evangelizadoras!";


    function comunidade() {
        imagem.style.opacity = 0;

        imagem.addEventListener(
            "transitionend",
            function () {
                indiceAtual = (indiceAtual + 1) % comunidades.length;
                imagem.src = comunidades[indiceAtual];
                imagem.style.opacity = 1;
                console.log(indiceAtual);
                console.log(legenda.textContent)
            },
            { once: true }
        );

        if (indiceAtual === 1 || indiceAtual === 2) {
            legenda.innerHTML = "Visita de Nossa Senhora de Fátima!";
        }
        if (indiceAtual === 3) {
            legenda.innerHTML = " Procissão com Nossa Senhora Aparecida";
        }
        if (indiceAtual === 4) {
            legenda.innerHTML = `Via Sacra`;
        }
        if (indiceAtual === 5 || indiceAtual === 6 || indiceAtual === 7) {
            legenda.innerHTML = `Formação Catequese`;
        }
        if (indiceAtual === 8) {
            legenda.innerHTML = "Ações Evangelizadoras!";
        }
    }

    setTimeout(() => {
        setInterval(comunidade, "5000");
    }, "1000");

document.getElementById("imagem").src = comunidades[indiceAtual];
