// Seleciona o elemento com a classe CSS 'pokemons' e armazena-o na variável 'btnExpandir'
var btnExpandir = document.querySelector('.pokemons');

// Seleciona o elemento com a classe CSS 'menuSide' e armazena-o na variável 'menuLateral'
var menuLateral = document.querySelector('.menuSide');

var bntClose = document.querySelector('.btnClose');

// Função para abrir o menu
function abrirMenu() {
    menuLateral.classList.add('expandir');
    document.body.classList.add('noscroll'); // Adicione a classe 'noscroll' ao <body>
    document.querySelector('.overlay').style.display = 'block'; // Exibir a sobreposição

    // Para bloquear o evento de toque
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, { passive: false });
}

// Função para fechar o menu
function fecharMenu() {
    menuLateral.classList.remove('expandir');
    document.body.classList.remove('noscroll');
    document.querySelector('.overlay').style.display = 'none'; // Ocultar a sobreposição

    // Remova o evento de bloqueio do evento de toque
    document.body.removeEventListener('touchmove', function (e) {
        e.preventDefault();
    });
}

// Adicione um evento de clique ao elemento 'btnExpandir' para alternar entre abrir e fechar o menu
btnExpandir.addEventListener('click', function () {
    abrirMenu();
});

// Adicione um evento de clique ao botão de fechar para fechar o menu
bntClose.addEventListener('click', function () {
    fecharMenu();
});
