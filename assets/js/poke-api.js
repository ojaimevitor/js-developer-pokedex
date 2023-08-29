// Declaração de um objeto chamado pokeApi
const pokeApi = {}

// Função para converter detalhes da API de Pokémon em um objeto Pokemon personalizado
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Cria uma nova instância da classe Pokemon
    const pokemon = new Pokemon()
    // Atribui o número do Pokémon ao atributo 'number'
    pokemon.number = pokeDetail.id
    // Atribui o nome do Pokémon ao atributo 'name'
    pokemon.name = pokeDetail.name

    // Mapeia os tipos do Pokémon a partir dos detalhes da API
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // Seleciona o primeiro tipo (assumindo que o Pokémon tem pelo menos um tipo)
    const [type] = types

    // Atribui a lista de tipos ao atributo 'types'
    pokemon.types = types
    // Atribui o tipo primário ao atributo 'type'
    pokemon.type = type

    // Atribui a URL da imagem do Pokémon ao atributo 'photo'
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // Retorna o objeto Pokémon personalizado
    return pokemon
}

// Função para obter detalhes de um Pokémon específico da API
pokeApi.getPokemonDetail = (pokemon) => {
    // Realiza uma solicitação HTTP GET para a URL do Pokémon
    return fetch(pokemon.url)
        .then((response) => response.json()) // Converte a resposta em JSON
        .then(convertPokeApiDetailToPokemon) // Chama a função de conversão para criar um objeto Pokemon
}

// Função para obter uma lista de Pokémons da API com base no deslocamento e limite
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // Constrói a URL da API com base no deslocamento e limite fornecidos
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Realiza uma solicitação HTTP GET para a URL da lista de Pokémons
    return fetch(url)
        .then((response) => response.json()) // Converte a resposta em JSON
        .then((jsonBody) => jsonBody.results) // Extrai a lista de Pokémons dos resultados JSON
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia a lista para obter detalhes individuais de cada Pokémon
        .then((detailRequests) => Promise.all(detailRequests)) // Executa todas as solicitações de detalhes em paralelo
        .then((pokemonsDetails) => pokemonsDetails) // Retorna a lista de detalhes de Pokémons
}
