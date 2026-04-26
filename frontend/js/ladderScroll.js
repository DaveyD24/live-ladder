function scrollToEnd() {
    document.querySelectorAll(".stats-col").forEach(row => {
        row.scrollLeft = row.scrollWidth
    })
}
window.addEventListener("load", scrollToEnd);
window.addEventListener("resize", scrollToEnd);