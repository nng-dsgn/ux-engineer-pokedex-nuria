// Variables globales
let pokemons = [];
let filterMode = "name"; // Puede ser "name" o "number"

// Renderizar la UI de cada Pokémon
function renderPokemonCard(pokemon) {
    const gridSection = document.querySelector(".grid");
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
        <a href="detail.html?pokemonId=${pokemon.id}">
            <p class="pokemon-id">#${pokemon.id.toString().padStart(3, "0")}</p>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemon-img">
            <div class="card-content">
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
        </a>
    `;

    gridSection.appendChild(card);
}

// Actualizar la grilla
function updateGrid(filteredPokemons) {
    const gridSection = document.querySelector(".grid");
    gridSection.innerHTML = ""; // Limpiar la grilla
    filteredPokemons.forEach(renderPokemonCard); // Renderizar los Pokémon filtrados
}

// Manejar el filtro
function handleFilter(event) {
    const query = event.target.value.toLowerCase();
    const filtered = pokemons.filter(pokemon => {
        if (filterMode === "name") {
            return pokemon.name.toLowerCase().includes(query);
        } else if (filterMode === "number") {
            return pokemon.id.toString().startsWith(query);
        }
        return false;
    });
    updateGrid(filtered);
}

// Cambiar el modo de filtro
function changeFilterMode(mode) {
    filterMode = mode;
    document.querySelectorAll(".dropdown li").forEach(li => li.classList.remove("selected"));
    document.querySelector(`.dropdown li[data-sort="${mode}"]`).classList.add("selected");
}

// Inicializar la página
async function initPage() {
    pokemons = await getPokemonListFromAPI(30); // Obtener 30 Pokémon
    updateGrid(pokemons);


    const searchButton = document.getElementById("search-button");


    // Event listeners
    // Seleccionamos el contenedor y el input
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');

    // Añadimos la clase .search-focused cuando el input tiene el foco
    searchInput.addEventListener('focus', () => {
      searchContainer.classList.add('search-focused');
    });

    // Eliminamos la clase .search-focused cuando el input pierde el foco
    searchInput.addEventListener('blur', () => {
      searchContainer.classList.remove('search-focused');
    });

    const dropdown = document.getElementById("sort-dropdown");
    dropdown.addEventListener("click", (event) => {
        const sortMode = event.target.dataset.sort;
        if (sortMode) changeFilterMode(sortMode);
    });

    searchButton.addEventListener("click", () => {
      if (dropdown.classList.contains("hidden")) {
          dropdown.classList.remove("hidden");
      } else {
          dropdown.classList.add("hidden");
      }
  });
}

// Ejecutar la inicialización
initPage();
