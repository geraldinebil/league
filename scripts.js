document.addEventListener('DOMContentLoaded', async () => {
//Création des variables
l


//Récupération des Élement DOM
})
const championsContainer = document.getElementById('champions')
const championDetailsContainer = document.getElementById('champion-details')

//Appel de tout les champions
const championsData = ['http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/Aatrox.json']


//Les appels à l'API
await fetch('http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/Aatrox.json', 'GET', fetchChampion);
fetch('http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/Aatrox.json/?limit=200', 'GET',setAllChampion);

//Récupère tous les champions et fait une boucle dessus pour mon slider a droite
function setAllChampion(){
    allChampion = [];
    let champ;
    let response = JSON.parse(this.response)
    response.results.map((lol, index) => {
        fetch(lol.url, 'GET', (e) => {
            poke = JSON.parse(e.originalTarget.response)
            allPokemon.push(champ)
        })
    })
}

fetchChampion();