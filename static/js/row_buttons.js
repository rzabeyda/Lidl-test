document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("row-buttons-container");

    // Данные трёх кнопок
    const buttonsData = [
        { id: "btn-bin", color: "red", icon: "bin.png", alt: "Удалить" },
        { id: "btn-euro", color: "blue", icon: "euro.png", alt: "Сумма" },
        { id: "btn-note", color: "yellow", icon: "note.png", alt: "Заметка" }
    ];

    buttonsData.forEach(btnData => {
        const btn = document.createElement("button");
        btn.id = btnData.id;
        btn.className = `row-button ${btnData.color}`;

        // Иконка внутри кнопки
        btn.innerHTML = `<div class="icon"><img src="static/icons/${btnData.icon}" alt="${btnData.alt}"></div>`;

        // Анимация при нажатии
        btn.addEventListener("click", () => {
            btn.classList.add("active");
            const icon = btn.querySelector(".icon img");
            icon.style.transform = "scale(1.4)";
            setTimeout(() => {
                btn.classList.remove("active");
                icon.style.transform = "scale(1)";
            }, 250);
        });

        container.appendChild(btn);
    });
});
