function scrollToEnd() {
    document.querySelectorAll(".stats-col").forEach(row => {
        row.scrollLeft = row.scrollWidth
    })
}
window.addEventListener("load", scrollToEnd);
window.addEventListener("resize", scrollToEnd);

const rows = document.querySelectorAll(".stats-col");
let active = null;
let isSyncing = false;

rows.forEach(row => {
    row.addEventListener("scroll", () => {
        if (isSyncing) {
            return;
        }
        isSyncing = true;

        const ratioX = row.scrollLeft / (row.scrollWidth - row.clientWidth || 1);

        rows.forEach(other => {
            if (other === row){ 
                return;
            }
            other.scrollLeft = ratioX * (other.scrollWidth - other.clientWidth);
        });

        isSyncing = false;
    });
});