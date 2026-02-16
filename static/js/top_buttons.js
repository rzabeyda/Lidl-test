document.addEventListener("DOMContentLoaded", () => {
    const topButtonsContainer = document.getElementById("top-buttons-container");

    products.forEach(product => {
        const btn = document.createElement("button");
        btn.className = "top-button";
        btn.dataset.id = product.name; // Важно для cart.js

        btn.innerHTML = `
            <div class="icon">
                ${iconsMap[product.name] ? `<img src="${iconsMap[product.name]}" alt="${product.name}">` : product.icon}
            </div>
            <div class="name">${product.name}</div>
            <div class="counter" style="display:none"></div>
        `;

        const counter = btn.querySelector(".counter");
        const icon = btn.querySelector(".icon img") || btn.querySelector(".icon");

        btn.addEventListener("click", () => {
            // ===== Анимация верхней кнопки =====
            btn.classList.add("active");
            icon.style.transform = "scale(1.3)";
            setTimeout(() => {
                btn.classList.remove("active");
                icon.style.transform = "scale(1)";
            }, 250);

            // ===== Обновление счётчика =====
            let count = parseInt(counter.textContent) || 0;
            count++;
            counter.textContent = count;
            counter.style.display = "flex";

            btn.classList.add("selected");

            // ===== Показ цены =====
            const priceTag = document.createElement("div");
            priceTag.textContent = `€${product.price.toFixed(2)}`;
            priceTag.style.position = "absolute";
            priceTag.style.bottom = "50px";  // выводим сверху кнопки вниз
            priceTag.style.left = "50%";
            priceTag.style.transform = "translateX(-50%)";
            priceTag.style.color = "white";
            priceTag.style.fontSize = "12px";
            priceTag.style.fontWeight = "bold";
            priceTag.style.pointerEvents = "none";
            priceTag.style.transition = "all 0.5s ease-out";
            priceTag.style.zIndex = "999";

            btn.appendChild(priceTag);

            setTimeout(() => {
                priceTag.style.opacity = "0";
                priceTag.style.transform = "translateX(-50%) translateY(10px)"; // анимация вниз
            }, 800);

            setTimeout(() => {
                btn.removeChild(priceTag);
            }, 1200);

            // ===== ВЫБРАСЫВАЕМ СОБЫТИЕ ДЛЯ cart.js =====
            const event = new CustomEvent("topButtonClicked", { detail: product });
            document.dispatchEvent(event);
        });

        topButtonsContainer.appendChild(btn);
    });
});
