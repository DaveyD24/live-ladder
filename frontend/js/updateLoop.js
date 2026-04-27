import CompletedGame from "./components/CompletedGame.js";
import UpcomingGame from "./components/UpcomingGame.js";
import LiveGame from "./components/LiveGame.js";

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
        switch(game.matchState) {
            case "UPCOMING": gamesContainer.innerHTML += UpcomingGame(game); break;
            case "COMPLETED": gamesContainer.innerHTML += CompletedGame(game); break;
            default: gamesContainer.innerHTML += LiveGame(game); break;
        }
    })
}