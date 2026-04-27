function render(game) {
    return `
        <div class="w-9/10 max-w-200 flex flex-col items-center justify-center rounded-lg border border-slate-200 dark:border-neutral-700">
            <div class="flex justify-between w-full px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-tr-lg rounded-tl-lg">
                <span class="text-sm md:text-md text-red-500 font-bold">LIVE</span>
                <span class="text-sm md:text-md ${game.matchState === "GOLDENPOINT" ? 'text-orange-400 dark:text-orange-300' : ('text-gray-700 dark:text-zinc-50')}  font-bold">${game.matchState === "PROGRESS" ? (game.progress.minutes + ":" + game.progress.seconds) : game.matchState}</span>
            </div>
            <div class="flex items-center justify-between px-3 md:px-6 py-4 w-full bg-white dark:bg-neutral-950">
                <div class="flex items-center">
                    <img class="w-12 md:w-18 mr-4" src="image/${game.homeTeam.teamName.replace(" ", "").toLowerCase()}.png"/>
                    <div class="flex flex-col">
                        <p class="text-sm text-slate-400 dark:text-neutral-400 font-bold">HOME</p>
                        <p class="font-bold text-md dark:text-zinc-50 leading-none">${game.homeTeam.threeLetterCode}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 font-inter">
                    <span class="text-2xl md:text-4xl font-bold text-red-500">${game.homeTeam.score}</span>
                    <span class="text-xl md:text-2xl text-slate-300 dark:text-neutral-400">-</span>
                    <span class="text-2xl md:text-4xl font-bold text-red-500">${game.awayTeam.score}</span>
                </div>
                <div class="flex items-center">
                    <div class="flex flex-col items-end">
                        <p class="text-sm text-slate-400 dark:text-neutral-400 font-bold">AWAY</p>
                        <p class="font-bold text-md dark:text-zinc-50 leading-none">${game.awayTeam.threeLetterCode}</p>
                    </div>
                    <img class="w-12 md:w-18 ml-4" src="image/${game.awayTeam.teamName.replace(" ", "").toLowerCase()}.png"/>
                </div>
            </div>
            <div class="flex justify-center items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-neutral-800 w-full rounded-bl-lg rounded-br-lg text-xs text-slate-500 dark:text-neutral-400">
                <svg width="12px" height="12px" viewBox="0 0 20 20">
                    <g stroke="none" stroke-width="1" fill="#62748e" fill-rule="evenodd">
                        <g transform="translate(-223.000000, -5439.000000)" fill="#62748e">
                            <g transform="translate(56.000000, 160.000000)">
                                <path d="M176,5286.219 C176,5287.324 175.105,5288.219 174,5288.219 C172.895,5288.219 172,5287.324 172,5286.219 C172,5285.114 172.895,5284.219 174,5284.219 C175.105,5284.219 176,5285.114 176,5286.219 M174,5296 C174,5296 169,5289 169,5286 C169,5283.243 171.243,5281 174,5281 C176.757,5281 179,5283.243 179,5286 C179,5289 174,5296 174,5296 M174,5279 C170.134,5279 167,5282.134 167,5286 C167,5289.866 174,5299 174,5299 C174,5299 181,5289.866 181,5286 C181,5282.134 177.866,5279 174,5279" id="pin_sharp_circle-[#624]"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                <span>${game.stadium}</span>
            </div>
        </div>
    `;
}
export default render;