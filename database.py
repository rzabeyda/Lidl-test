# database.py — работа с базой SQLite для корзины

import aiosqlite

DB_NAME = "lidl.db"

async def init_db():
    """Создаём таблицу корзины, если ещё нет"""
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS cart (
                user_id TEXT,
                product_name TEXT,
                count INTEGER,
                PRIMARY KEY(user_id, product_name)
            )
        """)
        await db.commit()

async def get_cart(user_id: str):
    """Возвращает корзину пользователя как dict {product_name: count}"""
    async with aiosqlite.connect(DB_NAME) as db:
        cursor = await db.execute("SELECT product_name, count FROM cart WHERE user_id = ?", (user_id,))
        rows = await cursor.fetchall()
        return {row[0]: row[1] for row in rows}

async def save_cart(user_id: str, cart: dict):
    """Сохраняет корзину пользователя. cart = {product_name: count}"""
    async with aiosqlite.connect(DB_NAME) as db:
        # Удаляем старые записи
        await db.execute("DELETE FROM cart WHERE user_id = ?", (user_id,))
