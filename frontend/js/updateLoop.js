import CompletedGame from "./components/CompletedGame.js";
import UpcomingGame from "./components/UpcomingGame.js";
import LiveGame from "./components/LiveGame.js";
import LadderRow from "./components/LadderRow.js";

fetchGames();
setInterval(fetchGames, 6000);

async function fetchGames() {
    let jsonData = {};
    await fetch("http://localhost:3000/data")
        .then(res => res.json())
        .then(data => jsonData = data)
    generateLadder(jsonData);
    generateGames(jsonData);
}

function generateLadder(jsonData) {
    const ladderRowContainer = document.querySelector(".ladder-row-container");
    while (ladderRowContainer.children.length > 1) {
        ladderRowContainer.removeChild(ladderRowContainer.lastElementChild);
    }
    jsonData.ladder.teams.forEach(team => {
        ladderRowContainer.innerHTML += LadderRow(team);
    })
    ladderRowContainer.children[1].classList.remove("rounded-tr-lg");
    ladderRowContainer.children[8].classList.add("mb-4")
    const rows = ladderRowContainer.querySelectorAll(".stats-col");
    rows[rows.length-1].classList.remove("no-scrollbar");
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