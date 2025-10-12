// server.js
// В самом верху файла
require('dotenv').config(); 

// Импортируем установленные библиотеки
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Создаем приложение Express
const app = express();
const PORT = 3000; // Порт, на котором будет работать наш сервер

// --- ВАШИ ДАННЫЕ ИЗ TELEGRAM ---
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; 
// ------------------------------------

// Подключаем middleware для обработки JSON и CORS
app.use(cors()); // Разрешает запросы с других доменов (с нашего сайта)
app.use(express.json()); // Позволяет серверу читать JSON из тела запроса

// Создаем эндпоинт (маршрут) для приема заказов
app.post('/api/submit-order', async (req, res) => {
    // Получаем данные, которые отправил frontend
    const { itemName, quantity, customerName, customerPhone } = req.body;

    // Простая проверка, что все данные пришли
    if (!itemName || !quantity || !customerName || !customerPhone) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' });
    }

    // Формируем красивое сообщение для Telegram
    const message = `
🔔 *Новый заказ!* 🔔
-------------------------
*Товар:* ${itemName}
*Количество:* ${quantity} шт.
-------------------------
*Имя клиента:* ${customerName}
*Телефон:* ${customerPhone}
*Комментарии:* ${customerСomment}
`;

    // URL для отправки сообщения через API Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        // Отправляем запрос в Telegram
        await axios.post(telegramApiUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown' // Используем Markdown для форматирования
        });

        // Если все успешно, отправляем ответ frontend'у
        console.log('Заказ успешно отправлен в Telegram!');
        res.status(200).json({ message: 'Заказ успешно оформлен!' });

    } catch (error) {
        // Если произошла ошибка
        console.error('Ошибка при отправке в Telegram:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Не удалось оформить заказ.' });
    }
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});