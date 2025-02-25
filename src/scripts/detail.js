// Función para obtener el ID del Pokémon desde la URL
function getPokemonIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonId = urlParams.get('pokemonId');
  return pokemonId;
}

// Función para obtener detalles del Pokémon desde la API
async function getPokemonDetailFromAPI(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details');
      }
      const pokemonData = await response.json();
      return pokemonData;
  } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return null;
  }
}

// Función para obtener el número total de Pokémon desde la API
async function getTotalPokemonCount() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1"; // Solo obtener 1 Pokémon para obtener el total
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch Pokémon count');
      }
      const data = await response.json();
      return data.count; // El total de Pokémon disponible
  } catch (error) {
      console.error("Error fetching Pokémon count:", error);
      return 898; // Devuelve un valor predeterminado en caso de error
  }
}

// Función para obtener el color según el tipo de Pokémon
function getTypeColor(type) {
  const typeColors = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      bug: '#A8B820',
      dragon: '#7038F8',
      fairy: '#EE99AC',
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      ghost: '#705898',
      steel: '#B8B8D0',
      ice: '#98D8D8',
      dark: '#705848',
  };
  return typeColors[type] || '--pkd-color-primary'; // Retorna color primario si no está definido
}

// Función para renderizar la interfaz de detalles del Pokémon
function renderDetailPokemonUI(pokemon, pokemonId, maxPokemonId) {
  const characterDetail = document.querySelector(".character-detail__container");

  // Ajustar nombre y ID del personaje en el header
  const characterNameElement = document.querySelector(".character-name");
  const characterIdElement = document.querySelector(".character-id");

  // Capitalizar la primera letra del nombre del Pokémon
  characterNameElement.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  characterIdElement.textContent = `ID: ${pokemon.id || "Desconocido"}`;

  // Establecer el color del fondo en función del tipo principal del Pokémon
  const primaryColor = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0]?.type?.name : null;
  const secondaryColor = pokemon.types && pokemon.types.length > 1 ? pokemon.types[1]?.type?.name : null;
  const finalColor = getTypeColor(primaryColor) || getTypeColor(secondaryColor);
  document.documentElement.style.setProperty('--pkd-color-primary', finalColor);

    const statAbbreviations = {
      "hp": "HP",
      "attack": "ATK",
      "defense": "DEF",
      "special-attack": "SATK",
      "special-defense": "SDEF",
      "speed": "SPD"
    };


  // Mostrar la interfaz con los detalles
  characterDetail.innerHTML = `
 
      <header class="character-detail__header">
          <!-- Imagen de fondo -->
          <img src="assets/logotype/logo_pokeball.png" alt="Background Image" class="background-image" />

          <img alt="Personaje anterior" src="assets/icons/chevron_left.webp" class="character-detail__icon" id="previous-pokemon" />

          <img alt="Personaje ${pokemon.name}" src="${pokemon.sprites.other['official-artwork'].front_default}" class="character-detail__img" />
        
          <img alt="Personaje posterior" src="assets/icons/chevron_right.webp" class="character-detail__icon" id="next-pokemon" />
      </header>

      <section class="info-pokemon">
          <section class="character-detail__type">
            ${pokemon.types.map((type, index) => {
                const typeColor = getTypeColor(type.type.name);  // Obtener el color del tipo
                // Capitalizamos la primera letra del tipo
                const capitalizedType = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
                return `
                    <div class="type-chip ${index === 0 ? 'first-chip' : ''} ${index === 1 ? 'second-chip' : ''}" style="background-color: ${typeColor};">
                        ${capitalizedType}
                    </div>
                `;
            }).join('')}
        </section>

          <h3 class="character-description__subheader">About</h3>
          <section class="character-detail__about">
              
              <div class="character-detail__info">
                  <div class="info-item">
                      <section class="info-lisitem">
                          <img src="assets/icons/weight.webp" alt="Weight Icon" />
                          <p class="info-text">${pokemon.weight} kg</p>
                      </section>
                      <p class="info-caption">Weight</p>
                  </div>

                  <!-- Divider between Weight and Height -->
                  <div class="divider"></div>

                  <div class="info-item">
                      <section class="info-lisitem">
                          <img src="assets/icons/straighten.webp" alt="Height Icon" />
                          <p class="info-text">${pokemon.height} m</p>
                      </section>
                      <p class="info-caption">Height</p>
                  </div>

                  <!-- Divider between Height and Abilities -->
                  <div class="divider"></div>


                  <div class="info-item">
                      <p class="info-text">${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
                      <p class="info-caption">Abilities</p>
                  </div>
              </div>
          </section>

          <section class="character-detail__moves">
              <p class="text__moves">${pokemon.moves.map(move => move.move.name).join(", ")}</p>
          </section>

          <h3 class="character-description__subheader">Base Stats</h3>
            <section class="character-detail__base-stats">
                <div class="stat-columns">
                    <div class="stat-column__label">
                        ${pokemon.stats.map(stat => `
                            <p class="label"><label for="${stat.stat.name}">${statAbbreviations[stat.stat.name] || stat.stat.name.toUpperCase()}</label></p>
                        `).join("")}
                    </div>

                     <div class="stat-column divider">
                        ${pokemon.stats.map(() => `
                            <div class="divider-line"></div>
                        `).join("")}
                    </div>

                    <!-- Columna de datos -->
                      <div class="stat-column__data">
                          ${pokemon.stats.map(stat => `
                              <p class="stat-data">${stat.base_stat}</p>
                          `).join("")}
                      </div>

                    <!-- Columna de barras -->
                    <div class="stat-column__charts">
                        ${pokemon.stats.map(stat => `
                            <div class="stat-chart">
                                <div class="stat-chart-bar" style="width: ${stat.base_stat}%"></div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </section>
      </section>
  `;

  // Lógica para ocultar los iconos de navegación si no hay Pokémon anterior o posterior
  const previousPokemonButton = document.getElementById('previous-pokemon');
  const nextPokemonButton = document.getElementById('next-pokemon');

  // Si el Pokémon es el primero, ocultamos el botón anterior
  if (pokemonId <= 1) {
      previousPokemonButton.style.display = 'none';
  } else {
      previousPokemonButton.style.display = 'block';
  }

  // Si el Pokémon es el último, ocultamos el botón siguiente
  if (pokemonId >= maxPokemonId) {
      nextPokemonButton.style.display = 'none';
  } else {
      nextPokemonButton.style.display = 'block';
  }

  // Eventos para navegar entre Pokémon (anterior/siguiente)
  previousPokemonButton.addEventListener('click', () => navigateToPokemon(pokemonId - 1));
  nextPokemonButton.addEventListener('click', () => navigateToPokemon(pokemonId + 1));
}

// Función para navegar entre Pokémon
function navigateToPokemon(id) {
  if (id < 1) id = 1; // No permitir ID menores a 1
  window.location.href = `?pokemonId=${id}`;
}

// Función principal para cargar y mostrar el Pokémon
async function loadPokemon() {
  const pokemonId = getPokemonIdFromUrl();
  if (!pokemonId) {
      console.error("No Pokémon ID found in URL");
      return;
  }

  // Obtener el total de Pokémon disponibles
  const maxPokemonId = await getTotalPokemonCount();
  const pokemonData = await getPokemonDetailFromAPI(pokemonId);

  if (pokemonData) {
      renderDetailPokemonUI(pokemonData, pokemonId, maxPokemonId);
  } else {
      console.error("Error loading Pokémon details");
  }
}

// Llamar a la función principal para cargar el Pokémon cuando se carga la página
window.onload = loadPokemon;
