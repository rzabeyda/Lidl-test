# lidl.py — Telegram бот с WebApp кнопкой для @golidlbot

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo, InputFile
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import os

# 🔹 Токен твоего бота
TOKEN = "8353827125:AAG2HR63c6_bvJx28kTnJE4ZIlxZy44TYfw"

# 🔹 WebApp URL — именно наша страничка
WEBAPP_URL = "https://rzabeyda.github.io/Lidl-test/"

# 🔹 Путь к приветственной картинке
WELCOME_IMG_PATH = "static/icons/duck.jpg"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка команды /start"""

    user_name = update.effective_user.first_name or "друг"
    text = f"Привет, {user_name} 🤗\nНажми на кнопку, чтобы открыть шопинг:"

    keyboard = [
        [
            InlineKeyboardButton(
                text="Зашопиться 🛍️",
                web_app=WebAppInfo(url=WEBAPP_URL)
            )
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем картинку + текст + кнопку
    try:
        with open(WELCOME_IMG_PATH, "rb") as f:
            await update.effective_message.reply_photo(
                photo=InputFile(f),
                caption=text,
                reply_markup=reply_markup
            )
    except FileNotFoundError:
        # Если картинка не найдена, просто текст
        await update.effective_message.reply_text(
            text=text,
            reply_markup=reply_markup
        )

def main():
    app = ApplicationBuilder().token(TOKEN).build()

    # Добавляем хэндлер /start
    app.add_handler(CommandHandler("start", start))

    print("🚀 Бот @golidlbot запущен. Команда /start активна.")
    app.run_polling()

if __name__ == "__main__":
    main()
