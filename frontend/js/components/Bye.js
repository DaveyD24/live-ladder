function render(byes) {
    let imgString = "";
    byes.forEach(bye => {
        const imagePath = `image/${bye.team.teamName.replace(" ", "").toLowerCase()}.png`;
        imgString += `<img class='w-10' src='${imagePath}'/>`
    });
    return `
        <div class="w-9/10 lg:w-95/100 desktop:w-9/10 max-w-200 lg:max-w-full desktop:max-w-200 relative bg-white dark:bg-neutral-950 flex flex-row justify-center items-center gap-8 py-4 rounded-lg border border-slate-200 dark:border-neutral-700 col-span-2">
            <p class="absolute left-1/30 text-md font-inter text-gray-700 dark:text-zinc-50">Byes</p>
            ${imgString}
        </div>
    `;
}
export default render;