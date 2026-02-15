// Ждём полной загрузки DOM, чтобы контейнер для кнопок точно существовал
document.addEventListener("DOMContentLoaded", () => {

    // Получаем контейнер, в который будем вставлять все верхние кнопки
    const topButtonsContainer = document.getElementById("top-buttons-container");

    // Объект для хранения количества каждого товара в корзине
    let cart = {};

    // Проходим по всем товарам из products.js
    products.forEach(product => {

        // Создаём кнопку для каждого товара
        const btn = document.createElement("button");
        btn.className = "top-button"; // применяем базовые стили из CSS

        // Внутри кнопки создаём:
        // 1) div с иконкой (PNG или emoji)
        // 2) div с названием продукта
        // 3) div для счётчика, который изначально скрыт
        btn.innerHTML = `
            <div class="icon">
                ${iconsMap[product.name] ? `<img src="${iconsMap[product.name]}" alt="${product.name}">` : product.icon}
            </div>
            <div class="name">${product.name}</div>
            <div class="counter" style="display:none"></div>
        `;

        // Получаем ссылку на счётчик и иконку для дальнейшего обновления
        const counter = btn.querySelector(".counter");
        const icon = btn.querySelector(".icon img") || btn.querySelector(".icon"); // если PNG есть, используем img, иначе emoji

        // Добавляем обработчик клика по кнопке
        btn.addEventListener("click", () => {

            // Обновляем количество товара в cart
            // Если товар уже есть, увеличиваем на 1, иначе создаём и ставим 1
            cart[product.name] = cart[product.name] ? cart[product.name] + 1 : 1;

            // Анимация “подпрыгивания” кнопки и увеличение иконки
            btn.classList.add("active");       // добавляем класс active для CSS анимации vibro
            icon.style.transform = "scale(1.3)"; // увеличиваем иконку при нажатии
            setTimeout(() => {
                btn.classList.remove("active"); // убираем активный класс после 0.25 сек
                icon.style.transform = "scale(1)"; // возвращаем иконку к исходному размеру
            }, 250);

            // Обновляем счётчик на кнопке
            counter.textContent = cart[product.name]; // ставим актуальное количество
            counter.style.display = "flex";           // делаем счётчик видимым, если он скрыт

            // Делаем кнопку визуально “выбранной”
            btn.classList.add("selected"); // активируем эффект пульсации
        });

        // Вставляем кнопку в контейнер на странице
        topButtonsContainer.appendChild(btn);
    });
});
