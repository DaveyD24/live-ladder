import Game from "./components/Game.js";

fetchGames();
setInterval(fetchGames, 6000);

async function fetchGames() {
    let jsonData = {};
    await fetch("http://localhost:3000/data")
        .then(res => res.json())
        .then(data => jsonData = data)
    generateGames(jsonData);
}

function generateGames(jsonData) {
    const gamesContainer = document.querySelector(".games-container");
    gamesContainer.innerHTML = "";
    jsonData.games.forEach(game => {
        gamesContainer.innerHTML += Game(game);
    })
}