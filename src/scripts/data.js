// Función para obtener la lista de Pokémon
async function getPokemonListFromAPI() {
    const httpResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=150"
    );
    const pokemons = await httpResponse.json();
    // con el map genero una nueva peticion HTTP para cada pokemon en un arra. Tendre un array de peticiones
    // Realizamos fetch adicional para cada Pokémon para obtener detalles
    const allDetailedRequest = pokemons.results.map((pokemon) =>
      getPokemonDetailFromAPIByName(pokemon.name)
    );
    // esto es un array de objetos { status, value }. Nos interesa el value
    const allPokemonSettled = await Promise.allSettled(allDetailedRequest);
    // recorre el array anterior, generando uno nuevo (ya que es map) solo con la propiedad value
    return allPokemonSettled.map((pokemonSettled) => pokemonSettled.value);
  }
  
  async function getPokemonDetailFromAPIByName(name) {
    const httpResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await httpResponse.json();
    return pokemon;
  }
  
  async function getCharacterListFromAPI() {
    // API REST
    //Paso 1: solicitar al servidor los dtos, recibiendo una respuesta
    const httpResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=30"
    );
    // Paso 2: proceso la respuesta
    const characters = await httpResponse.json();
    return characters;
  }
  
  async function getCharacterDetailFromAPIById(id) {
    const httpResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const character = await httpResponse.json();
    return character;
  }