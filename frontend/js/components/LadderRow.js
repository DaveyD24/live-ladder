const colourPairs = {
    "Brisbane": "bg-amber-800",
    "Canterbury": "bg-blue-600",
    "Canberra": "bg-green-500",
    "Cronulla": "bg-sky-400",
    "Gold Coast": "bg-orange-300",
    "Manly": "bg-orange-900",
    "Melbourne": "bg-violet-500",
    "New Zealand": "bg-zinc-600",
    "Newcastle": "bg-blue-600",
    "North QLD": "bg-yellow-400",
    "Parramatta": "bg-yellow-300",
    "Penrith": "bg-fuchsia-800",
    "St George": "bg-red-400",
    "South Sydney": "bg-green-500",
    "Sydney": "bg-red-400",
    "Wests": "bg-orange-400",
    "Redcliffe": "bg-red-400"
}

function render(team) {
    return `
        <div class="relative flex flex-row justify-start items-center h-12 desktop:h-16 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg rounded-br-lg">
            <div class="flex flex-row h-full justify-start items-center min-w-52 md:min-w-80 lg:min-w-96 desktop:min-w-85">
                <span class="h-12 desktop:h-16 min-w-2.5 rounded-l-sm inline-block ${colourPairs[team.localName]}"></span>
                <img src="image/broncos.png" class="w-8.75 desktop:w-12.5 ml-2 mr-2 lg:ml-4 lg:mr-4">
                <span class="md:hidden lg:text-xl font-bold tracking-tight dark:text-zinc-50 mr-2">${team.shorthand ?? team.localName.toUpperCase()}</span>
                <span class="hidden md:block lg:text-xl font-bold tracking-tight dark:text-zinc-50 mr-2">${team.localName.toUpperCase()}</span>
                <span class="text-xs lg:text-sm tracking-widest dark:text-zinc-100">${team.teamName.toUpperCase()}</span>
            </div>
            <span class="bg-white dark:bg-neutral-950 ml-8 h-12 desktop:h-16 inline-block w-[calc(100%-900px)] border-t border-b border-slate-200 dark:border-neutral-600"></span>
            <ul class="stats-col h-12 desktop:h-16 flex flex-nowrap overflow-x-auto w-full max-w-140 dark:text-zinc-100 no-scrollbar">
                <li class="h-full flex flex-none justify-center items-center w-14">${team.gamesPlayed}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.wins}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.draws}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.losses}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.byes}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.pointsFor}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.pointsAgainst}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.differential}</li>
                <li class="h-full flex flex-none justify-center items-center w-14">${team.winPercent + "%"}</li>
                <li class="h-full flex flex-none justify-center items-center w-14 font-bold">${team.points}</li>
            </ul>
        </div>
    `;
}
export default render;