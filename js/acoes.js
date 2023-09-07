const comunidades = [
    "https://1.bp.blogspot.com/-3ufJaeMtUkQ/WCcSMJlyYZI/AAAAAAAABVc/n4-jyot2S_kErdwLEOUo72ySW7AYLO4YQCLcB/s400/DSC00115.JPG", //0
    "https://1.bp.blogspot.com/-YXR7t4XRh70/WCcS8SYx4lI/AAAAAAAABVs/E2CjMby2EqopO8x8H5qYRdx4AuPleBnmwCLcB/s200/DSC00131.JPG", //1
    "https://4.bp.blogspot.com/-my6HqpoJZfA/WCcSNf1KPLI/AAAAAAAABVk/DxZ8pFofkGwHm7RN3T75IANZ6L-cmFzEACLcB/s320/DSC00246.JPG", //2
    "https://3.bp.blogspot.com/-TQrtqEwBqcM/WCcSgWUZerI/AAAAAAAABVo/GyhZseH9m8kLcNZwNhbi_jeQXSmsxnzQQCLcB/s320/DSC00249.JPG", //3
    // Cerco de Jericó
    "https://1.bp.blogspot.com/-NraNGziD7_0/WCcOje5dWwI/AAAAAAAABVM/L7L1HlxNqmEByTsgyMVNIZXIVAykKtmjQCLcB/s1600/DSC00478.JPG", //4
    "https://1.bp.blogspot.com/-7XUkQs6FyPQ/WCcOi_fVNfI/AAAAAAAABVI/AA2tqpPB2Hg6VyW-l-EqSC1S0ozSRxUiwCLcB/s320/DSC00473.JPG", //5
    "https://4.bp.blogspot.com/-QFGlVmTi4V4/WCcOiFQOhkI/AAAAAAAABVE/9qngP0OXh-k8g8XGAxEJ3qMBXJKHBMneQCLcB/s320/DSC00482.JPG", //6
    "https://1.bp.blogspot.com/-cq0hhXuFYv0/WCcO7o4L-1I/AAAAAAAABVQ/4jOFYfzV4GUUb1583ziQvT0HZJNPl8zogCLcB/s400/DSC00495.JPG", //7
    // Porta a Porta
    "https://4.bp.blogspot.com/-sGjXI9RMBLg/WCcYUaeTgjI/AAAAAAAABWI/3Rl1IyxGFcM0twmsZ3BnEPS6dDWMSOdzACLcB/s320/1475361666713.jpg", //8
    "https://4.bp.blogspot.com/-wYqc9sT4xgM/WCcYUJPrkLI/AAAAAAAABWE/WYg985lQ02wQ6jTy3YxhIyD-me9Wg5NrgCLcB/s320/1475441022597.jpg", //9
    "https://4.bp.blogspot.com/-R9ej3wwUhwI/WCcYUA9K-VI/AAAAAAAABWA/OMLvpCLYvvskWXNHLQBfMAy-8IBleq-swCLcB/s400/1475520879980.jpg", //10
    "https://2.bp.blogspot.com/-GaYnz60UOWQ/WCcYUpyl_mI/AAAAAAAABWM/fAOyBpX4lg0W6FSSAhaKevfc9lfph8DRQCLcB/s320/1475524635180.jpg", //11
    // ação social
    "https://4.bp.blogspot.com/-ZBjdoHg6ajc/VoFtk89mx0I/AAAAAAAABNc/cF89PDvncts/s320/DSC04498.JPG", //12
    "https://3.bp.blogspot.com/-XUkWPg3AyfI/VoFtYGbKpVI/AAAAAAAABNM/zyJnTx0_UIc/s320/DSC05116.JPG", //13
    // teatro e dança
    "https://4.bp.blogspot.com/-V97_S-t4yMk/VoF4BkqEWZI/AAAAAAAABO8/TRRfZ7FNuFc/s320/DSCF2160.JPG", //14
    "https://4.bp.blogspot.com/-3v9mX3qutek/VoF4D2EGKRI/AAAAAAAABPI/8NbotBmSgO4/s320/DSCF2169.JPG", // 15
    "https://1.bp.blogspot.com/--lvpqJOA8Og/VoF4D6uKcjI/AAAAAAAABPE/HgZrN9Q6cBM/s320/DSCF2182.JPG" //16

];
var indiceAtual = 0;
const legenda = document.querySelector("#lgd");
function comunidade() {
    imagem.style.opacity = 0;
    imagem.addEventListener(
        "transitionend",
        function () {
            indiceAtual = (indiceAtual + 1) % comunidades.length;
            imagem.src = comunidades[indiceAtual];
            imagem.style.opacity = 1;
        },
        { once: true }
    );
    if (indiceAtual === 0) {
        legenda.innerHTML =
            "Igreja nas casas, levando consolo e trazendo de volta para casa do Pai das Misericórdias!";
    } else {
        legenda.innerHTML =
            "Igreja em saída, nas ruas com o Povo!";
    }
    if (indiceAtual === 3 || indiceAtual === 4 || indiceAtual === 5 || indiceAtual === 6){
        legenda.innerHTML =
            "Realização de Cerco de Jericó - Experiência com o Cristo Vivo e Ressuscitado presente na Santíssima Eucaristia!";
    }
    if (indiceAtual === 7 || indiceAtual === 8 || indiceAtual === 9 || indiceAtual === 10){
        legenda.innerHTML =
            "Evangelização Porta-Porta";
    }
    if (indiceAtual === 11 || indiceAtual === 12){
        legenda.innerHTML =
            `AÇÃO SOCIAL - Distribuição de Sopa e Cestas básicas <br> "Dai de comer a quem tem fome"`;
    }
    if (indiceAtual === 13 || indiceAtual === 14 || indiceAtual === 15){
        legenda.innerHTML =
            `Evangelização por meio de Teatro e Dança`;
    }
    
}
document.getElementById("imagem").src = comunidades[indiceAtual];
