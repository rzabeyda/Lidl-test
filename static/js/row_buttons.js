document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("row-buttons-container");

    const buttonsData = [
        { id: "btn-bin", color: "red", icon: "bin.png", alt: "Удалить" },
        { id: "btn-euro", color: "blue", icon: "euro.png", alt: "Сумма" },
        { id: "btn-note", color: "yellow", icon: "note.png", alt: "Заметка" }
    ];

    buttonsData.forEach(btnData => {
        const btn = document.createElement("button");
        btn.id = btnData.id;
        btn.className = `row-button ${btnData.color}`;
        btn.innerHTML = `<div class="icon"><img src="static/icons/${btnData.icon}" alt="${btnData.alt}"></div>`;
        container.appendChild(btn);
    });
});
