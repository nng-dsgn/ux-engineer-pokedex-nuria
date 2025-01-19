// Función para obtener el ID del Pokémon desde la URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('pokemonId');
    console.log("Pokemon ID:", pokemonId);  // Verifica que el ID esté siendo obtenido correctamente
    return pokemonId;
}


async function getPokemonDetailFromAPI(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;  // Asegúrate de que el endpoint sea correcto
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon details');
        }
        const pokemonData = await response.json();
        console.log("Pokemon Data:", pokemonData);  // Verifica que los datos se estén obteniendo correctamente
        return pokemonData;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        return null;
    }
}

  
  // Renderizar la UI de detalles del Pokémon
  function renderDetailPokemonUI(pokemon) {
    const characterDetail = document.querySelector(".character-detail__container");
  
    // Establecer nombre y ID del personaje en el header
    document.querySelector(".character-name").textContent = pokemon.name;
    document.querySelector(".character-id").textContent = `ID: ${pokemon.id}`;
  
    // Estructura de la vista de detalles en HTML inline
    characterDetail.innerHTML = `
      <header class="character-detail__header">
        <img alt="Personaje ${pokemon.name}" src="${pokemon.sprites.other["official-artwork"].front_default}" class="character-detail__img" />
      </header>
  
      <section class="character-detail__type">
        <div class="type-chip">${pokemon.types.map(type => type.type.name).join(", ")}</div>
        <div class="type-chip">${pokemon.position}</div>
      </section>
  
      <section class="character-detail__about">
        <h3 class="character-description__subheader">About</h3>
        <div class="character-detail__info">
          <div class="info-item">
            <img src="assets/icons/weight-icon.png" alt="Weight Icon" />
            <p class="info-text">${pokemon.weight}</p>
            <p>Weight</p>
          </div>
          <div class="info-item">
            <img src="assets/icons/height-icon.png" alt="Height Icon" />
            <p class="info-text">${pokemon.height}</p>
            <p>Height</p>
          </div>
          <div class="info-item">
            <p class="info-text">${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
            <p>Abilities</p>
          </div>
        </div>
      </section>
  
      <section class="character-detail__moves">
        <h3 class="character-description__subheader">Moves</h3>
        <p>${pokemon.moves.map(move => move.move.name).join(", ")}</p>
      </section>
  
      <section class="character-detail__base-stats">
        <h3 class="character-description__subheader">Base Stats</h3>
        ${pokemon.stats.map(stat => `
          <div class="base-stat">
            <p>${stat.stat.name.toUpperCase()}</p>
            <div class="stat-bar">
              <input type="range" value="${stat.base_stat}" max="100" disabled />
              <span class="stat-score">${stat.base_stat}</span>
            </div>
          </div>
        `).join("")}
      </section>
    `;
  }
  
  // Inicializar la página de detalles
  async function initPage() {
    const pokemonId = getPokemonIdFromUrl();  // Obtener el ID del Pokémon
    console.log("Fetched Pokemon ID:", pokemonId);

    const pokemon = await getPokemonDetailFromAPI(pokemonId);  // Obtener los detalles del Pokémon
    if (pokemon) {
        console.log("Pokemon details:", pokemon);  // Verifica que los detalles se hayan recibido correctamente
        renderDetailPokemonUI(pokemon);  // Renderiza los detalles en la interfaz
    } else {
        console.error("No Pokémon data available.");
    }
}

initPage();
