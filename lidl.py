# lidl.py — бот для Telegram, только приветствие и кнопка WebApp
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, InputFile, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import os

# Токен бота
TOKEN = os.getenv("BOT_TOKEN")
if not TOKEN:
    raise ValueError("BOT_TOKEN не найден в переменных окружения")

# Ссылка на веб-шоп
URL = "https://github.com/rzabeyda/Lidl-test/?v=2"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка команды /start: приветствие + картинка + кнопка WebApp"""
    user_name = update.effective_user.first_name
    text = f"Привет, {user_name} 🤗"

    keyboard = [[
        InlineKeyboardButton(
            "Зашопиться 🛍️",
            web_app=WebAppInfo(url=URL)
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем картинку + текст + кнопку
    with open("duck1.jpg", "rb") as f:
        await update.message.reply_photo(
            photo=InputFile("duck1.jpg", filename="duck_fresh.jpg"),
            caption=text,
            reply_markup=reply_markup
        )

if __name__ == "__main__":
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    print("Бот запущен! /start для приветствия")
    try:
        app.run_polling()
    except KeyboardInterrupt:
        print("Бот остановлен")
