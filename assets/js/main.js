const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151; // Número máximo de registros (Pokémons)
const limit = 10; // Número de Pokémons a serem carregados a cada vez
let offset = 0; // Deslocamento inicial

// Função para converter um objeto Pokémon em uma representação HTML (li)
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

const typeColors = {

        normal: '#a6a877',
        grass: '#77c850',
        fire: '#ee7f30',
        water: '#678fee',
        electric: '#f7cf2e',
        ice: '#98d5d7',
        ground: '#dfbf69',
        flying: '#a98ff0',
        poison: '#a040a0',
        fighting: '#bf3029',
        psychic: '#f65687',
        dark: '#725847',
        rock: '#b8a137',
        bug: '#a8b720',
        ghost: '#6e5896',
        steel: '#b9b7cf',
        dragon: '#6f38f6',
        fairy: '#f9aec7',
        
};

// Função para lidar com o clique em um Pokémon
function itemClicado(elemento) {
    const number = elemento.querySelector('.number').textContent; // Obtém o número do Pokémon
    const name = elemento.querySelector('.name').textContent; // Obtém o nome do Pokémon
    const photo = elemento.querySelector('img').src; // Obtém o URL da imagem do Pokémon (supondo que está dentro de um elemento <img>)
    const types = Array.from(elemento.querySelectorAll('.type')).map(typeElement => typeElement.textContent); // Obtém os tipos do Pokémon

    console.log("Você clicou no Pokémon", number);
    console.log("Nome:", name);
    console.log("Foto:", photo);
    console.log("Tipos:", types);
    
    // Agora, você já tem os valores corretos, use-os para atualizar os elementos HTML

    // Selecionar os elementos HTML
    const pokemonNameElement = document.getElementById('pokemonName');
    const pokemonTypeElement = document.getElementById('pokemonType');
    const pokemonNumberElement = document.getElementById('pokemonNumber');
    const pokemonImageElement = document.getElementById('pokemonImage'); // Selecionar o elemento de imagem

    // Verifique se pelo menos um tipo foi encontrado
    if (types.length > 0) {
        const backgroundColor = typeColors[types[0].toLowerCase()]; // Use o primeiro tipo para definir a cor de fundo
        
        // Aplique a cor de fundo aos elementos
        pokemonNameElement.style.backgroundColor = backgroundColor;
        pokemonTypeElement.style.backgroundColor = backgroundColor;
    }

    // Atualizar os elementos com os valores obtidos
    pokemonNameElement.textContent = `Nome: ${name}`; // Use a variável 'name'
    pokemonTypeElement.textContent = `Tipo: ${types.join(', ')}`; // Use a variável 'types' e junte os tipos em uma string
    pokemonNumberElement.textContent = `${number}`; // Use a variável 'number'
    pokemonImageElement.src = photo; // Atualize o src da imagem
}



// Função para carregar Pokémons na lista
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join(''); // Converte os Pokémons em elementos HTML
        pokemonList.innerHTML += newHtml; // Adiciona os elementos à lista

        // Adiciona eventos de clique a todos os elementos gerados
        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach((item) => {
            item.addEventListener('click', () => {
                itemClicado(item); // Quando um Pokémon é clicado, chama a função itemClicado
            });
        });
    });
}

// Carrega os primeiros Pokémons
loadPokemonItens(offset, limit);

// Adiciona um evento de clique ao botão "Carregar Mais"
loadMoreButton.addEventListener('click', () => {
    offset += limit; // Aumenta o deslocamento para carregar mais Pokémons
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit); // Carrega os últimos Pokémons se o limite for excedido
        loadMoreButton.parentElement.removeChild(loadMoreButton); // Remove o botão "Carregar Mais"
    } else {
        loadPokemonItens(offset, limit); // Carrega mais Pokémons
    }
});
