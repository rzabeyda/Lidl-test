const topButtonsContainer = document.getElementById("top-buttons-container");

// создаём кнопки один раз
products.forEach(product => {
    const btn = document.createElement("button");
    btn.className = "top-button";

    btn.innerHTML = `
        <div class="icon">
            ${iconsMap[product.name] ? `<img src="${iconsMap[product.name]}" alt="${product.name}">` : product.icon}
        </div>
        <div class="name">${product.name}</div>
    `;

    // счётчик создаём сразу, но пустой
    const counter = document.createElement("div");
    counter.className = "counter";
    counter.style.display = "none"; // пока не нажали
    btn.appendChild(counter);

    btn.addEventListener("click", () => {
        addToCart(product.name);

        // анимация кнопки
        const icon = btn.querySelector(".icon img") || btn.querySelector(".icon");
        btn.classList.add("active");
        icon.style.transform = "scale(1.3)";
        setTimeout(() => {
            btn.classList.remove("active");
            icon.style.transform = "scale(1)";
        }, 200);

        // обновляем счётчик локально
        const qty = getCartQuantity(product.name);
        if (qty > 0) {
            counter.textContent = qty;
            counter.style.display = "flex";
        } else {
            counter.style.display = "none";
        }

        // здесь можно вызвать обновление нижних кнопок и total
        // renderCartButtons();
        // updateTotal();
    });

    topButtonsContainer.appendChild(btn);
});
