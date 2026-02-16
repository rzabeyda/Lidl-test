// blue_button.js
document.addEventListener("DOMContentLoaded", () => {
    const blueButton = document.getElementById("btn-euro");
    if (!blueButton) return;

    let total = 0;

    // Функция обновления отображения суммы
    function updateBlueButton() {
        const icon = blueButton.querySelector(".icon");
        let sumDisplay = blueButton.querySelector(".sum-display");

        if (total > 0) {
            // Скрываем иконку
            if (icon) icon.style.display = "none";

            // Показываем сумму
            if (!sumDisplay) {
                sumDisplay = document.createElement("div");
                sumDisplay.className = "sum-display";
                blueButton.appendChild(sumDisplay);
            }
            sumDisplay.textContent = `€${total.toFixed(2)}`;
            sumDisplay.style.color = "white";
            sumDisplay.style.fontSize = "24px";
            sumDisplay.style.fontWeight = "bold";
        } else {
            // Если сумма 0 — вернуть иконку
            if (icon) icon.style.display = "flex";
            if (sumDisplay) sumDisplay.remove();
        }
    }

    // ===== Добавление суммы при клике на верхние кнопки =====
    document.addEventListener("topButtonClicked", (e) => {
        const product = e.detail;
        total += product.price;
        updateBlueButton();
    });

    // ===== Уменьшение суммы при клике на нижние кнопки =====
    document.addEventListener("DOMContentLoaded", () => {
        const cartContainer = document.getElementById("cart-container");

        cartContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".bottom-button");
            if (!btn) return;

            const productName = btn.dataset.id;
            const product = products.find(p => p.name === productName);
            if (!product) return;

            const counter = btn.querySelector(".counter");
            let value = parseInt(counter.textContent || 1);
            value -= 1;

            total -= product.price;
            if (total < 0) total = 0;
            updateBlueButton();
        });
    });

    // ===== Включаем свечение + вибрацию при клике на синюю кнопку =====
    blueButton.addEventListener("click", () => {
        const allButtons = document.querySelectorAll(".top-button, .bottom-button, .row-button");
        allButtons.forEach(btn => {
            btn.classList.add("mass-glow");
            setTimeout(() => btn.classList.remove("mass-glow"), 1500);
        });
    });

    // ===== Обнуление при клике на красную кнопку =====
    const redButton = document.getElementById("btn-bin");
    if (redButton) {
        redButton.addEventListener("click", () => {
            total = 0;
            updateBlueButton();
        });
    }
});
