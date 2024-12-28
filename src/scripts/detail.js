function renderDetailCharacterUI(character) {
    // Crea la estructura de la view de detalle
    const character = document.createElement("div");
    character.classList.add("character-detail__container");

    // Estructura de los detalles en HTML inline
    characterCard.innerHTML = `
        <header class="character-detail__header">
            <img alt="Personaje ${character.name}" src="${character.image}" class="character-detail__img" />
        </header>
        <section class="character-detail__body">
            <div class="character-detail__info">
                <h2 class="character-description__title">${character.name}</h2>
                <p class="character-description__text"><strong>ID:</strong> ${character.id}</p>
                <p class="character-description__text"><strong>Ki:</strong> ${character.ki}</p>
                <p class="character-description__text"><strong>Max KI:</strong> ${character.maxKi}</p>
                <p class="character-description__text"><strong>Raza:</strong> ${character.race}</p>
                <p class="character-description__text"><strong>Género:</strong> ${character.gender}</p>
                <p class="character-description__text"><strong>Descripción:</strong> ${character.description}</p>
                <p class="character-description__text"><strong>Afilación:</strong> ${character.affiliation}</p>
                <p class="character-description__text"><strong>Eliminado En:</strong> ${character.deletedAt || "N/A"}</p>
            </div>

            <div class="character-detail-card__origin-planet">
                <h3 class="character-description__subheader">Planeta de Origen</h3>
                <p class="character-description__text"><strong>ID:</strong> ${character.originPlanet.id}</p>
                <p class="character-description__text"><strong>Nombre:</strong> ${character.originPlanet.name}</p>
                <p class="character-description__text"><strong>¿Destruido?</strong> ${character.originPlanet.isDestroyed ? "Sí" : "No"}</p>
                <p class="character-description__text"><strong>Descripción:</strong> ${character.originPlanet.description}</p>
                <img alt="Planeta de origen" src="${character.originPlanet.image}" class="character-detail-card__origin-planet-img" />
                <p class="character-description__text"><strong>Eliminado En:</strong> ${character.originPlanet.deletedAt || "N/A"}</p>
            </div>

            <div class="character-detail-card__transformations">
                <h3 class="character-description__subheader">Transformaciones</h3>
                ${character.transformations.map(transformation => `
                    <div class="transformation-item">
                        <p class="character-description__text"><strong>Nombre:</strong> ${transformation.name}</p>
                        <p class="character-description__text"><strong>ID:</strong> ${transformation.id}</p>
                        <p class="character-description__text"><strong>KI:</strong> ${transformation.ki}</p>
                        <img alt="Transformación ${transformation.name}" src="${transformation.image}" class="character-detail-card__transformation-img" />
                        <p class="character-description__text"><strong>Eliminado En:</strong> ${transformation.deletedAt || "N/A"}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;


    // Añadir el contenido al contenedor principal de la página de detalles
    const containerElement = document.querySelector("main");
    containerElement.appendChild(characterCard);
}
  
  async function initPage() {
    const characterId = getCharacterIdFromUrl(); // paso 1: obtener el id de la URL
    const dbCharacter = await getCharacterDetailFromAPIById(characterId); // paso 2: Buscar la información de detalle del personaje
    renderDetailCharacterUI(dbCharacter); // pintar en la UI el personaje
   
  }
  
  initPage();