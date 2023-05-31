document.addEventListener('DOMContentLoaded', () => {
    const championsContainer = document.getElementById('champions');
    const championDetailsContainer = document.getElementById('champion-details');
    const previousButton = document.getElementById('previous-btn');
    const nextButton = document.getElementById('next-btn');
  
    const championsPerPage = 15; // Nombre de champions affichés par page
    let currentPage = 1;
    let championsData = []; // Tableau des données des champions
    let totalPages = 0;
  
    // Fonction pour afficher les champions sur une page donnée
    function showChampionsOnPage(page) {
      championsContainer.innerHTML = '';
      const startIndex = (page - 1) * championsPerPage;
      const endIndex = startIndex + championsPerPage;
      const championsOnPage = championsData.slice(startIndex, endIndex);
  
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
  
    // Récupération des données des champions depuis l'API
    fetch('http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json')
      .then(response => response.json())
      .then(data => {
        championsData = Object.values(data.data);
        totalPages = Math.ceil(championsData.length / championsPerPage);
        showChampionsOnPage(currentPage);
      })
      .catch(error => {
        console.log('Une erreur s\'est produite lors de la récupération des données des champions :', error);
      });
  
    // Fonction pour passer à la page précédente
    function goToPreviousPage() {
      if (currentPage > 1) {
        currentPage--;
        showChampionsOnPage(currentPage);
      }
    }
  
    // Fonction pour passer à la page suivante
    function goToNextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        showChampionsOnPage(currentPage);
      }
    }
  
    // Événement click pour le bouton précédent
    previousButton.addEventListener('click', goToPreviousPage);
  
    // Événement click pour le bouton suivant
    nextButton.addEventListener('click', goToNextPage);
  });

  championDetailsContainer.innerHTML = championDetails;
  championDetailsContainer.style.display = 'block';