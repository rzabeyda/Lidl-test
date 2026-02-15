// cart.js — хранение корзины в localStorage
const CART_KEY = "lidl_cart";

// загружаем cart из localStorage или создаём пустой
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};

// сохраняем cart в localStorage
function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// добавляем товар
function addToCart(name) {
    if (cart[name]) {
        cart[name] += 1;
    } else {
        cart[name] = 1;
    }
    saveCart();
}

// убираем товар
function removeFromCart(name) {
    if (cart[name]) {
        cart[name] -= 1;
        if (cart[name] <= 0) delete cart[name];
        saveCart();
    }
}

// получаем общее количество товаров
function getCartQuantity(name) {
    return cart[name] || 0;
}

// получаем общую сумму (если понадобится)
function getCartTotal(productsList) {
    let total = 0;
    for (let key in cart) {
        const product = productsList.find(p => p.name === key);
        if (product) total += product.price * cart[key];
    }
    return total.toFixed(2);
}
