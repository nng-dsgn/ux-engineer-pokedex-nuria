function renderDetailCharacterUI(character) {
    const characterCard = document.createElement("a");
    // Esto es lo que enlaza la card del listado con la página de detalle con el id concreto
    characterCard.href = `./detail.html?characterId=${character.id}`;
    characterCard.classList.add("character-card__container");
    if (character.race === "Saiyan") {
      characterCard.classList.add("character-card__container--saiyan");
    }
  
    characterCard.innerHTML = `
          <header class="character-card__header">
              <img alt="Personaje ${character.name}" src="${character.image}" />
          </header>
          <section class="character-card__body">
              <div>
                  <h2 class="character-description__title character-description__text--${
                    character.affiliation === "Z Fighter"
                      ? "z-fighter"
                      : "primary"
                  }">${character.name}</h2>
                  <p class="character-description__text--result">${character.race} - ${character.gender}</p>
              </div>
              <div>
                  <p class="character-description__text--subheader">Base KI</p>
                  <p class="character-description__text--result">${character.ki}</p>
              </div>
              <div>
                  <p class="character-description__text--subheader">Max KI</p>
                  <p class="character-description__text--result">${character.maxKi}</p>
              </div>
              <div>
                  <p class="character-description__text--subheader">Base KI</p>
                  <p class="character-description__text--result">${character.ki}</p>
              </div>
          </section>
      `;
    // CREO EL LIST ITEM Y LE AÑADO LA CARD
    const listItem = document.createElement("li");
    listItem.appendChild(characterCard);
  
    // BUSCO EL UL Y LE AÑADO EL LI
    const characterList = document.querySelector(".character-list__container");
    characterList.appendChild(listItem);
  }
  
  async function initPage() {
    const characters = await getCharacterListFromAPI();
  
    for (let character of characters.items) {
      renderDetailCharacterUI(character);
    }
  }
  
  initPage();