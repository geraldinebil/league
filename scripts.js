document.addEventListener('DOMContentLoaded', () => {

  const championsContainer = document.getElementById('champions');
  const championDetailsContainer = document.getElementById('champion-details');
  const previousButton = document.getElementById('previous-btn');
  const nextButton = document.getElementById('next-btn');
  const searchInput = document.getElementById('search-input');
  const championsPerPage = 15; // Nombre de champions affichés par page
  let currentPage = 1;
  let championsData = []; // Tableau des données des champions
  let filteredChampions = []; // Tableau des champions filtrés
  let totalPages = 0;
 
  // Fonction pour afficher les champions sur une page donnée
  function showChampionsOnPage(page) {
    championsContainer.innerHTML = '';
    const startIndex = (page - 1) * championsPerPage;
    const endIndex = startIndex + championsPerPage;
    const championsOnPage = filteredChampions.slice(startIndex, endIndex);

    championsOnPage.forEach(champion => {
      const championElement = document.createElement('div');
      championElement.classList.add('champion');
      championElement.addEventListener('click', () => showChampionDetails(champion));

      const championImage = document.createElement('img');
      championImage.src = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champion.image.full}`;
      championImage.alt = champion.name;

      const championName = document.createElement('h3');
      championName.textContent = champion.name;

      championElement.appendChild(championImage);
      championElement.appendChild(championName);
      championsContainer.appendChild(championElement);
    });
  }

  // Fonction pour afficher les détails du champion sélectionné
  function showChampionDetails(champion) {
    const championDetails = `
      <img src="http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champion.image.full}" alt="${champion.name}">
      <h2>${champion.name}</h2>
      <p>${champion.title}</p>
      <p>${champion.blurb}</p>
    `;
    championDetailsContainer.innerHTML = championDetails;
    championDetailsContainer.style.display = 'block';
  }

  // Fonction de recherche par nom
  function searchChampionsByName(searchTerm) {
    filteredChampions = championsData.filter(champion => {
      return champion.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    totalPages = Math.ceil(filteredChampions.length / championsPerPage);
    currentPage = 1;
    showChampionsOnPage(currentPage);
  }

  // Fonction de recherche par type
  function searchChampionsByType(searchTerm) {
    filteredChampions = championsData.filter(champion => {
      return champion.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    totalPages = Math.ceil(filteredChampions.length / championsPerPage);
    currentPage = 1;
    showChampionsOnPage(currentPage);
  }

  // Gestion de l'événement de saisie dans la barre de recherche
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
      filteredChampions = championsData;
    } else {
      // Recherche par nom
      // searchChampionsByName(searchTerm);

      // Recherche par type
      searchChampionsByType(searchTerm);
    }
    totalPages = Math.ceil(filteredChampions.length / championsPerPage);
    currentPage = 1;
    showChampionsOnPage(currentPage);
  });

  // Gestion de l'événement du bouton précédent
  previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showChampionsOnPage(currentPage);
    }
  });

  // Gestion de l'événement du bouton suivant
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showChampionsOnPage(currentPage);
    }
  });

  // Récupération des données des champions depuis l'API
  fetch('http://ddragon.leagueoflegends.com/cdn/13.10.1/data/fr_FR/champion.json')
    .then(response => response.json())
    .then(data => {
      championsData = Object.values(data.data);
      filteredChampions = championsData;
      totalPages = Math.ceil(filteredChampions.length / championsPerPage);
      showChampionsOnPage(currentPage);
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la récupération des données des champions :', error);
    });
});
















