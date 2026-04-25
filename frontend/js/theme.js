const lightBtn = document.getElementById("light-btn")
const darkBtn = document.getElementById("dark-btn")

const theme = localStorage.getItem("theme");
if (theme === null) {
    localStorage.setItem("theme", "light");
}
if (theme === "dark") {
    alternateColourTheme();
}

lightBtn.addEventListener("click", () => {
    localStorage.setItem("theme", "light");
    alternateColourTheme();
});
darkBtn.addEventListener("click", () => {
    localStorage.setItem("theme", "dark");
    alternateColourTheme();
});

function alternateColourTheme() {
    document.documentElement.classList.toggle("dark");
    lightBtn.classList.toggle("hidden");
    darkBtn.classList.toggle("hidden");
}