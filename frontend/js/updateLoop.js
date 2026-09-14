import CompletedGame from "./components/CompletedGame.js";
import UpcomingGame from "./components/UpcomingGame.js";
import LiveGame from "./components/LiveGame.js";
import LadderRow from "./components/LadderRow.js";
import Bye from "./components/Bye.js";
import DeadLadder from "./components/DeadLadder.js";
import { addScrollListeners } from "./ladderScroll.js";

if (localStorage.getItem("sort") === null) {
    localStorage.setItem("sort", "points");
}
if (localStorage.getItem("historical") === null) {
    localStorage.setItem("historical", "false");
}

await fetchGames();
setInterval(fetchGames, 6000);

export async function fetchGames() {
    const sortKey = localStorage.getItem("sort");
    const historical = localStorage.getItem("historical")
    let jsonData = {};

    await fetch(`http://localhost:3000/data?sort=${sortKey}&historical=${historical}`)
        .then(res => res.json())
        .then(data => jsonData = data)

    generateLadder(jsonData);
    generateGames(jsonData);
}

function generateLadder(jsonData) {
    const ladderRowContainer = document.querySelector(".ladder-row-container");
    while (ladderRowContainer.children.length > 2) {
        ladderRowContainer.removeChild(ladderRowContainer.lastElementChild);
    }
    if (jsonData.ladder === undefined) {
        ladderRowContainer.innerHTML += DeadLadder();
        return;
    }
    jsonData.ladder.teams.forEach(team => {
        ladderRowContainer.innerHTML += LadderRow(team);
    })
    ladderRowContainer.children[2].classList.remove("rounded-tr-lg");
    ladderRowContainer.children[9].classList.add("mb-4");
    ladderRowContainer.children[9].classList.add("desktop:mb-8")
    const rows = ladderRowContainer.querySelectorAll(".stats-col");
    rows[rows.length-1].classList.remove("no-scrollbar");
    updateRoundLabel(jsonData.round, jsonData.year);
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

//TODO: Bug when extracting buttons to global scope
function addHeaderListeners() {
    const winBtn = document.getElementById("win-sort");
    const percentBtn = document.getElementById("percent-sort");
    const pointsBtn = document.getElementById("points-sort");
    winBtn.addEventListener("click", async () => {
        changeSortOrder(winBtn, "wins");
        await fetchGames();
    })
    percentBtn.addEventListener("click", async () => {
        changeSortOrder(percentBtn, "percent");
        await fetchGames();
    })
    pointsBtn.addEventListener("click", async () => {
        changeSortOrder(pointsBtn, "points");
        await fetchGames();
    })
}

function updateRoundLabel(round, year) {
    const lbl = document.getElementById("historical-label");
    lbl.textContent = "Round " + round + ", " + year;
}

async function changeSortOrder(element, key) {
    if (key !== "points" && key !== "wins" && key !== "percent") {
        return;
    }

    if (element.classList.contains("selected")) {
        return;
    }

    const winBtn = document.getElementById("win-sort");
    const percentBtn = document.getElementById("percent-sort");
    const pointsBtn = document.getElementById("points-sort");
    const headers = [winBtn, percentBtn, pointsBtn]

    for (const e of headers) {
        e.classList.remove("selected");
    }
    element.classList.add("selected");

    localStorage.setItem("sort", key);
    await fetchGames();
}

const history = localStorage.getItem("historical");
if (history === null) {
    localStorage.setItem("historical", "false");
}
if (history === "true") {
    alternateHistoryColour();
}

const historyBtn = document.getElementById("debug-btn");
historyBtn.addEventListener("click", async () => {
    localStorage.setItem("historical", localStorage.getItem("historical") === "true" ? "false": "true");
    alternateHistoryColour();
    fetchGames();
})

function alternateHistoryColour() {
    document.documentElement.classList.toggle("history");
}