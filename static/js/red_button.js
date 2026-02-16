// static/js/red_button.js

document.addEventListener("DOMContentLoaded", () => {
    const redButton = document.getElementById("btn-bin");

    if (!redButton) return; // если кнопка ещё не создана, ничего не делаем

    redButton.addEventListener("click", () => {
        // ===== 1. Сбрасываем все верхние кнопки =====
        document.querySelectorAll("#top-buttons-container .top-button").forEach(topBtn => {
            const counter = topBtn.querySelector(".counter");
            if (counter) {
                counter.textContent = "";
                counter.style.display = "none";
            }
            topBtn.classList.remove("selected");
        });

        // ===== 2. Убираем все нижние кнопки (корзину) =====
        const cartContainer = document.getElementById("cart-container");
        while (cartContainer.firstChild) {
            cartContainer.removeChild(cartContainer.firstChild);
        }

        // ===== 3. Обнуляем внутреннее состояние cart.js =====
        if (typeof saveCart === "function") {
            saveCart({}); // чистим корзину в localStorage
        }
    });
});
