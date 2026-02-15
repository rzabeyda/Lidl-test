// Ждём полной загрузки DOM, чтобы контейнер для кнопок точно существовал
document.addEventListener("DOMContentLoaded", () => {

    // Контейнер для всех верхних кнопок
    const topButtonsContainer = document.getElementById("top-buttons-container");

    // Объект для хранения количества каждого товара в корзине
    let cart = {};

    // Проходим по всем товарам из products.js
    products.forEach(product => {

        // Создаём кнопку для каждого товара
        const btn = document.createElement("button");
        btn.className = "top-button"; // базовые стили из CSS

        // Содержимое кнопки: иконка, название, счётчик (изначально скрыт)
        btn.innerHTML = `
            <div class="icon">
                ${iconsMap[product.name] ? `<img src="${iconsMap[product.name]}" alt="${product.name}">` : product.icon}
            </div>
            <div class="name">${product.name}</div>
            <div class="counter" style="display:none"></div>
        `;

        // Ссылки на элементы внутри кнопки
        const counter = btn.querySelector(".counter");
        const icon = btn.querySelector(".icon img") || btn.querySelector(".icon"); // img если есть, иначе emoji

        // Обработчик клика по кнопке
        btn.addEventListener("click", () => {

            // ======== ОБНОВЛЕНИЕ CART =========
            cart[product.name] = cart[product.name] ? cart[product.name] + 1 : 1;

            // ======== АНИМАЦИЯ КНОПКИ =========
            // подпрыгивание и увеличение иконки
            btn.classList.add("active");
            icon.style.transform = "scale(1.3)";
            setTimeout(() => {
                btn.classList.remove("active");
                icon.style.transform = "scale(1)";
            }, 250);

            // ======== ОБНОВЛЕНИЕ СЧЁТЧИКА =========
            counter.textContent = cart[product.name];
            counter.style.display = "flex";

            // ======== ВИЗУАЛЬНОЕ ВЫДЕЛЕНИЕ =========
            btn.classList.add("selected");

            // ======== ПОКАЗ ЦЕНЫ НА 1 СЕКУНДУ =========
            const priceTag = document.createElement("div");
            priceTag.textContent = `€${product.price.toFixed(2)}`;
            priceTag.style.position = "absolute";
            priceTag.style.top = "-20px";
            priceTag.style.left = "50%";
            priceTag.style.transform = "translateX(-50%)";
            priceTag.style.color = "white";
            priceTag.style.fontSize = "12px";
            priceTag.style.fontWeight = "bold";
            priceTag.style.pointerEvents = "none";
            priceTag.style.transition = "all 0.5s ease-out";

            btn.appendChild(priceTag);

            // плавное исчезновение через ~1 сек
            setTimeout(() => {
                priceTag.style.opacity = "0";
                priceTag.style.transform = "translateX(-50%) translateY(-10px)";
            }, 800);

            // удаляем элемент из DOM
            setTimeout(() => {
                btn.removeChild(priceTag);
            }, 1200);
        });

        // ======== ДОБАВЛЕНИЕ КНОПКИ В DOM =========
        topButtonsContainer.appendChild(btn);
    });
});
