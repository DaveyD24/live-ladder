function render(byes) {
    let imgString = "";
    byes.forEach(bye => {
        const imagePath = `image/${bye.team.teamName.replace(" ", "").toLowerCase()}.png`;
        imgString += `<img class='w-10' src='${imagePath}'/>`
    });
    return `
        <div class="w-9/10 lg:w-95/100 desktop:w-9/10 max-w-200 lg:max-w-full desktop:max-w-200 min-h-16 relative bg-white dark:bg-neutral-950 flex flex-col gap-4 md:flex-row justify-center items-center py-4 rounded-lg border border-slate-200 dark:border-neutral-700 col-span-2
            transition-all duration-200 ease-in-out">
            <p class="md:absolute left-1/30 text-md font-inter text-gray-700 dark:text-zinc-50">Byes</p>
            <div class='flex flex-row gap-8 overflow-x-auto md:overflow-x-visible no-scrollbar'>
                ${imgString}           
            </div>

        </div>
    `;
}
export default render;