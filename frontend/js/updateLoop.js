import CompletedGame from "./components/CompletedGame.js";
import UpcomingGame from "./components/UpcomingGame.js";
import LiveGame from "./components/LiveGame.js";
import LadderRow from "./components/LadderRow.js";
import Bye from "./components/Bye.js";
import { addScrollListeners } from "./ladderScroll.js";

const HARDCODED_BYES = {
    byes: [
        { team: {teamName: "Broncos"}},
        { team: {teamName: "Warriors"}},
        { team: {teamName: "Knights"}},
        { team: {teamName: "Cowboys"}},
        { team: {teamName: "Eels"}},
        { team: {teamName: "Panthers"}},
        { team: {teamName: "Dragons"}}
    ]
}

if (localStorage.getItem("sort") === null) {
    localStorage.setItem("sort", "points");
}

await fetchGames();
setInterval(fetchGames, 6000);

export async function fetchGames() {
    const sortKey = localStorage.getItem("sort");
    let jsonData = {};
    await fetch(`http://localhost:3000/data?sort=${sortKey}`)
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
    ladderRowContainer.children[8].classList.add("mb-4");
    ladderRowContainer.children[8].classList.add("desktop:mb-8")
    const rows = ladderRowContainer.querySelectorAll(".stats-col");
    rows[rows.length-1].classList.remove("no-scrollbar");
    addScrollListeners();
    addHeaderListeners();
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
    gamesContainer.innerHTML += Bye(jsonData.byes);
}

function addHeaderListeners() {
    const winBtn = document.getElementById("win-sort");
    const percentBtn = document.getElementById("percent-sort");
    const pointsBtn = document.getElementById("points-sort");
    winBtn.addEventListener("click", async () => {
        changeSortOrder("wins");
        await fetchGames();
    })
    percentBtn.addEventListener("click", async () => {
        changeSortOrder("percent");
        await fetchGames();
    })
    pointsBtn.addEventListener("click", async () => {
        changeSortOrder("points");
        await fetchGames();
    })
}

async function changeSortOrder(key) {
    if (key !== "points" && key !== "wins" && key !== "percent") {
        return;
    }
    localStorage.setItem("sort", key);
    await fetchGames();
}