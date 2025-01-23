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
        console.log("Voici les données reçues :", data);
        if (Array.isArray(data)) {
          data.slice(0, 20).forEach((item) => {
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
            container.appendChild(pokemonCard);
            pokemonCard.appendChild(pokemonName);
            pokemonCard.appendChild(pokemonImage);
            pokemonCard.appendChild(pokemonCategory);
            pokemonCard.appendChild(pokemonGeneration);
            pokemonCard.appendChild(pokemonNameEnglish);
            pokemonCard.appendChild(pokemonNameJapanese);
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
