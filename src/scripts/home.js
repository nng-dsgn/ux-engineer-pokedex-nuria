// Renderizar la UI de cada Pokémon
function renderPokemonCard(pokemon) {
  const gridSection = document.querySelector(".grid");

  // Crear el artículo de la tarjeta
  const card = document.createElement("article");
  card.classList.add("card");

  // Crear el contenido de la tarjeta
  card.innerHTML = `
    <p class="pokemon-id">#${pokemon.id.toString().padStart(3, "0")}</p>
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemon-img">
    <div class="card-content">
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    </div>
  `;


  // Añadir la tarjeta a la sección
  gridSection.appendChild(card);
}

// Inicializar la página
async function initPage() {
  const pokemons = await getPokemonListFromAPI(30); // Obtener 30 Pokémon
  
  // Renderizar cada Pokémon en la UI
  pokemons.forEach(renderPokemonCard);
}

// Ejecutar la inicialización
initPage();