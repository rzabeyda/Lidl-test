// yellow_button.js
document.addEventListener("DOMContentLoaded", () => {
    const yellowButton = document.getElementById("btn-note");
    if (!yellowButton) return;

    const NOTE_KEY = "lidl_note_data";

    function updateButtonGlow() {
        const data = localStorage.getItem(NOTE_KEY);
        if (data && data.trim().length > 0) {
            yellowButton.classList.add("note-has-data");
        } else {
            yellowButton.classList.remove("note-has-data");
        }
    }

    function createModal() {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";

        const modal = document.createElement("div");
        modal.className = "modal-note";

        modal.innerHTML = `
            <h2>Блокнот</h2>
            <textarea placeholder="Введите товары, которых нет в списке..."></textarea>
            <div class="note-buttons">
                <button class="note-btn note-save">Сохранить</button>
                <button class="note-btn note-clear">Очистить</button>
                <button class="note-btn note-close">Закрыть</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const textarea = modal.querySelector("textarea");
        const btnSave = modal.querySelector(".note-save");
        const btnClear = modal.querySelector(".note-clear");
        const btnClose = modal.querySelector(".note-close");

        const savedNote = localStorage.getItem(NOTE_KEY);
        if (savedNote) textarea.value = savedNote;

        btnSave.addEventListener("click", () => {
            localStorage.setItem(NOTE_KEY, textarea.value);
            updateButtonGlow();
            document.body.removeChild(overlay);
        });

        btnClear.addEventListener("click", () => {
            textarea.value = "";
            localStorage.removeItem(NOTE_KEY);
            updateButtonGlow();
        });

        btnClose.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    }

    yellowButton.addEventListener("click", createModal);

    updateButtonGlow();
});
