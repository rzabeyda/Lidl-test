// top_buttons.js — отрисовка верхних кнопок
const topButtonsContainer = document.getElementById("top-buttons-container");

function renderTopButtons() {
    topButtonsContainer.innerHTML = ""; // очистка контейнера

    products.forEach(product => {
        const btn = document.createElement("button");
        btn.className = "top-button";

        // содержимое кнопки
        btn.innerHTML = `
            <div class="icon">${iconsMap[product.name] ? `<img src="${iconsMap[product.name]}" alt="${product.name}">` : product.icon}</div>
            <div class="name">${product.name}</div>
            ${getCartQuantity(product.name) > 0 ? `<div class="counter">${getCartQuantity(product.name)}</div>` : ""}
        `;

        // событие клика
        btn.addEventListener("click", () => {
            addToCart(product.name);
            renderTopButtons(); // обновляем счётчики
            renderCartButtons(); // обновляем нижние кнопки (пока создадим позже)
            updateTotal(); // обновляем синюю кнопку (пока создадим позже)
            animateButton(btn); // эффект прыжка
        });

        topButtonsContainer.appendChild(btn);
    });
}

// эффект прыжка кнопки при клике
function animateButton(button) {
    button.classList.add("jump");
    setTimeout(() => button.classList.remove("jump"), 300);
}

// сразу отрисуем
renderTopButtons();
