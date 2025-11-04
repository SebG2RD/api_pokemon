// @ts-nocheck
const baseUrl = "https://tyradex.vercel.app/api/v1/pokemon";

if (baseUrl) {
  const container = document.querySelector(".container");
  if (container) {
    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors de l'appel API");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Voici les données reçues :", data);
        if (Array.isArray(data)) {
          data.slice(0, 150).forEach((item) => {
            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");

            const pokemonName = document.createElement("h2");
            pokemonName.textContent = item.name.fr;

            const pokemonImage = document.createElement("img");
            pokemonImage.classList.add("pokemon-image");
            pokemonImage.src = item.sprites.regular;
            pokemonImage.alt = item.name.fr;

            const pokemonCategory = document.createElement("p");
            pokemonCategory.textContent = `Catégorie : ${item.category}`;

            const pokemonGeneration = document.createElement("p");
            pokemonGeneration.textContent = `Génération : ${item.generation}`;

            const pokemonNameEnglish = document.createElement("p");
            pokemonNameEnglish.textContent = `Nom anglais : ${item.name.en}`;

            const pokemonNameJapanese = document.createElement("p");
            pokemonNameJapanese.textContent = `Nom japonais : ${item.name.jp}`;

            const pokemonSpritesContainer = document.createElement("div");
            pokemonSpritesContainer.classList.add("pokemon-sprites-container");
            const pokemonSprites = document.createElement("img");
            pokemonSprites.classList.add("pokemon-sprites");
            pokemonSprites.alt = item.name.fr;
            pokemonSprites.src = item.sprites.regular;
            pokemonSpritesShiny = document.createElement("img");
            pokemonSpritesShiny.classList.add("pokemon-sprites-shiny");
            pokemonSpritesShiny.alt = item.name.fr;
            pokemonSpritesShiny.src = item.sprites.shiny;
            let pokemonSpritesGmax = document.createElement("img");
            pokemonSpritesGmax.classList.add("pokemon-sprites-gmax");
            pokemonSpritesGmax.alt = item.name.fr;
            if (item.sprites.gmax) {
              if (
                typeof item.sprites.gmax === "object" &&
                item.sprites.gmax.regular
              ) {
                pokemonSpritesGmax.src = item.sprites.gmax.regular;
              } else if (typeof item.sprites.gmax === "string") {
                pokemonSpritesGmax.src = item.sprites.gmax;
              } else {
                pokemonSpritesGmax.src = "./assets/images/R.png";
              }
            } else {
              pokemonSpritesGmax.src = "./assets/images/R.png";
            }
            console.log("pokemonSpritesGmax.src", pokemonSpritesGmax.src);
            container.appendChild(pokemonCard);
            pokemonCard.appendChild(pokemonName);
            pokemonCard.appendChild(pokemonImage);
            pokemonCard.appendChild(pokemonCategory);
            pokemonCard.appendChild(pokemonGeneration);
            pokemonCard.appendChild(pokemonNameEnglish);
            pokemonCard.appendChild(pokemonNameJapanese);
            pokemonCard.appendChild(pokemonSpritesContainer);
            pokemonSpritesContainer.appendChild(pokemonSprites);
            pokemonSpritesContainer.appendChild(pokemonSpritesShiny);
            pokemonSpritesContainer.appendChild(pokemonSpritesGmax);
          });
        } else {
          console.error("Erreur : les données reçues ne sont pas un tableau.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'appel API :", error);
      });
  } else {
    console.error("Erreur : le container n'a pas été trouvé.");
  }
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  pokemonCards.forEach((pokemonCard) => {
    if (pokemonCard.textContent.toLowerCase().indexOf(searchValue) !== -1) {
      pokemonCard.style.display = "block";
    } else {
      pokemonCard.style.display = "none";
    }
  });
});
