// ===== CART STATE =====
const CART_KEY = "lidl_cart";

function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : {};
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ===== UPDATE BOTTOM BUTTON =====
function updateBottomButton(product) {
    const container = document.getElementById("cart-container");
    let btn = container.querySelector(`[data-id="${product.name}"]`);

    // получаем число с верхней кнопки
    const topBtn = document.querySelector(`#top-buttons-container [data-id="${product.name}"]`);
    const topCounter = parseInt(topBtn?.querySelector(".counter")?.textContent || 1);

    if (!btn) {
        // создаём нижнюю кнопку только при первом клике
        btn = document.createElement("button");
        btn.className = "bottom-button";
        btn.dataset.id = product.name;

        btn.innerHTML = `
            <div class="icon">
                ${iconsMap[product.name] ? `<img src="${iconsMap[product.name]}" alt="${product.name}">` : product.icon}
            </div>
            <div class="name">${product.name}</div>
            <div class="counter"></div>
        `;

        const icon = btn.querySelector(".icon img") || btn.querySelector(".icon");
        const counter = btn.querySelector(".counter");

        // клик — уменьшение на 1
        btn.addEventListener("click", () => {
            let value = parseInt(counter.textContent || 1);
            value -= 1;

            if (value <= 0) {
                btn.remove();
            } else {
                counter.textContent = value >= 2 ? value : "";
                counter.style.display = value >= 2 ? "flex" : "none";
            }

            // Анимация
            btn.classList.add("active");
            icon.style.transform = "scale(1.3)";
            setTimeout(() => {
                btn.classList.remove("active");
                icon.style.transform = "scale(1)";
            }, 250);

            // ⚡ Генерируем событие для уменьшения суммы синей кнопки
            const event = new CustomEvent("bottomButtonClicked", { detail: product });
            document.dispatchEvent(event);
        });

        container.appendChild(btn);
    }

    // обновляем кружок на нижней кнопке, синхронно с верхней
    const counter = btn.querySelector(".counter");
    counter.textContent = topCounter >= 2 ? topCounter : "";
    counter.style.display = topCounter >= 2 ? "flex" : "none";
}

// ===== CONNECT TO TOP BUTTONS =====
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("topButtonClicked", (e) => {
        updateBottomButton(e.detail);
    });
});
