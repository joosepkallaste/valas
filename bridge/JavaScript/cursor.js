document.addEventListener("mouseover", (e) => {
    if (e.target.matches("a, button, .btn")) {
        e.target.style.cursor = "url('Pildid/cursor/Card_Working.cur'), pointer";
    }
});

document.addEventListener("mouseout", (e) => {
    if (e.target.matches("a, button, .btn, .card")) {
        e.target.style.cursor = "url('Pildid/cursor/Card_Normal.cur'), auto";
    }
});