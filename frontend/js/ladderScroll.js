function scrollToEnd() {
    const col = document.getElementById("stats-col");
    col.scrollLeft = col.scrollWidth;
}
window.addEventListener("load", scrollToEnd);
window.addEventListener("resize", scrollToEnd);