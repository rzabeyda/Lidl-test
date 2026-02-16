# server.py — FastAPI сервер с WebApp + API корзины

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
import uvicorn
import asyncio
from database import init_db, get_cart, save_cart

app = FastAPI()

# Монтируем папку static
app.mount("/static", StaticFiles(directory="static"), name="static")

# ===== Инициализация базы =====
asyncio.run(init_db())

# ===== Отдаём index.html =====
@app.get("/", response_class=HTMLResponse)
async def root():
    with open("index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

# ===== API: получить корзину пользователя =====
@app.get("/api/cart")
async def api_get_cart(user_id: str):
    cart = await get_cart(user_id)
    return JSONResponse(content=cart)

# ===== API: сохранить корзину пользователя =====
@app.post("/api/cart")
async def api_save_cart(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    cart = data.get("cart")
    if not user_id or not isinstance(cart, dict):
        return JSONResponse({"error": "Неверные данные"}, status_code=400)
    await save_cart(user_id, cart)
    return JSONResponse({"status": "ok"})

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
