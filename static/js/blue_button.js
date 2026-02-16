// blue_button.js
document.addEventListener("DOMContentLoaded", () => {
    const blueButton = document.getElementById("btn-euro");
    if (!blueButton) return;

    blueButton.addEventListener("click", () => {
        // Находим все кнопки: верхние, нижние и ряд
        const allButtons = document.querySelectorAll(".top-button, .bottom-button, .row-button");

        allButtons.forEach(btn => {
            // Добавляем класс свечения
            btn.classList.add("mass-glow");

            // Убираем через 1.5 секунды
            setTimeout(() => {
                btn.classList.remove("mass-glow");
            }, 1500);
        });
    });
});
