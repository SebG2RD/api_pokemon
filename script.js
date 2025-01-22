const baseUrl = "https://tyradex.vercel.app/api/v1/pokemon";
if (baseUrl !== null) {
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
          data.forEach((item) => {
            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");
            pokemonCard.innerHTML = `
            <h2>${item.name.fr}</h2>
            <img src="${item.sprites.regular}" alt="${item.name.fr}" class="pokemon-image">
            <p><strong>Catégorie :</strong> ${item.category}</p>
            <p><strong>Génération :</strong> ${item.generation}</p>
            <p>Nom anglais : ${item.name.en}</p>
            <p>Nom japonais : ${item.name.jp}</p>
            `;
            container.appendChild(pokemonCard);
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
