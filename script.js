    // --- Добавьте эту переменную в начало вашего скрипта, где другие переменные
    let currentSelectedItem = null; 
// Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {

    // --- ДАННЫЕ О ТОВАРАХ ---
    // В реальном проекте эти данные могут приходить с сервера
    const menuData = [
        { id: 1, name: 'Классический Хотдог', price: 7, image: 'image/hotdog_Классик.jpg' },
        { id: 2, name: 'Пите', price: 20, image: 'image/Пите.jpg' },
        { id: 3, name: 'Картофель Фри', price: 10, image: 'image/Фри.jpg' },
        { id: 4, name: 'Классический Шаурма', price: 15, image: 'image/Шаурма_классик.jpg' },
        { id: 5, name: 'Пицца "Пепперони"', price: 450, image: 'text=Пицца' },
        { id: 6, name: 'Шаурма с курицей', price: 180, image: 'text=Шаурма' },
        { id: 7, name: 'Хот-дог', price: 100, image: 'text=Хот-дог' },
        { id: 8, name: 'Кока-Кола (0.5л)', price: 70, image: 'text=Кола' },
        { id: 9, name: 'Салат "Цезарь"', price: 220, image: 'text=Салат+Цезарь' },
        { id: 10, name: 'Молочный коктейль', price: 140, image: 'text=Коктейль' },
        { id: 11, name: 'Двойной бургер', price: 250, image: 'text=Двойной+бургер' },
        { id: 12, name: 'Сырные палочки', price: 110, image: 'text=Сырные+палочки' },
        { id: 13, name: 'Луковые кольца', price: 90, image: 'text=Луковые+кольца' },
        { id: 14, name: 'Спрайт (0.5л)', price: 70, image: 'text=Спрайт' },
        { id: 15, name: 'Сок апельсиновый', price: 80, image: 'text=Сок' },
        { id: 16, name: 'Чай (черный/зеленый)', price: 50, image: 'text=Чай' },
        { id: 17, name: 'Кофе Американо', price: 100, image: 'text=Кофе' }
    ];

    // --- ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ СО СТРАНИЦЫ ---
    const menuGrid = document.getElementById('menu-grid');
    const modal = document.getElementById('order-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const orderForm = document.getElementById('order-form');
    const modalItemInfo = document.getElementById('modal-item-info');
    const quantityDisplay = document.getElementById('quantity-display');
    const quantityIncreaseBtn = document.getElementById('quantity-increase');
    const quantityDecreaseBtn = document.getElementById('quantity-decrease');
    const thankYouMessage = document.getElementById('thank-you-message');

    let currentQuantity = 1;

    // --- ФУНКЦИИ ---

    // Функция для отрисовки всех товаров в меню
    function renderMenu() {
        menuGrid.innerHTML = ''; // Очищаем сетку перед отрисовкой
        menuData.forEach(item => {
            const menuItemHTML = `
                <div class="menu-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price} Сом.</p>
                </div>
            `;
            menuGrid.insertAdjacentHTML('beforeend', menuItemHTML);
        });
    }

    // Функция для открытия модального окна с данными о товаре
    function openModal(item) {
        currentSelectedItem = item; // <-- ДОБАВЬТЕ ЭТУ СТРОКУ, чтобы запомнить товар
		currentQuantity = 1; // Сбрасываем количество до 1
        updateQuantityDisplay();
        
        // Заполняем информацию о товаре в модальном окне
        modalItemInfo.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">${item.price} Сом.</p>
        `;
        
        modal.classList.remove('hidden'); // Показываем окно
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.add('hidden'); // Скрываем окно
        orderForm.reset(); // Очищаем поля формы
    }
    
    // Обновление отображения количества
    function updateQuantityDisplay() {
        quantityDisplay.textContent = currentQuantity;
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // Клик по товару в меню (используем делегирование событий)
    menuGrid.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('.menu-item');
        if (!clickedItem) return; // Если клик был не по товару, ничего не делаем

        const itemId = parseInt(clickedItem.dataset.id);
        const selectedItem = menuData.find(item => item.id === itemId);

        if (selectedItem) {
            openModal(selectedItem);
        }
    });

    // Клик по кнопке "закрыть" в модальном окне
    closeModalBtn.addEventListener('click', closeModal);

    // Клик вне модального окна также закрывает его
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Увеличение количества
    quantityIncreaseBtn.addEventListener('click', () => {
        currentQuantity++;
        updateQuantityDisplay();
    });

    // Уменьшение количества
    quantityDecreaseBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            updateQuantityDisplay();
        }
    });

    // --- А ТЕПЕРЬ ПОЛНОСТЬЮ ЗАМЕНИТЕ ВАШ СТАРЫЙ ОБРАБОТЧИК ФОРМЫ НА ЭТОТ ---
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;
    	// 1. Считываем комментарий
    	const customerComment = document.getElementById('customer-comment').value;

        // Собираем данные для отправки на сервер
        const orderData = {
            itemName: currentSelectedItem.name,
            quantity: currentQuantity,
            customerName: customerName,
            customerPhone: customerPhone,
            customerComment: customerComment
        };
        
        try {
            // Отправляем данные на наш backend сервер
            const response = await fetch('https://my-cafe-api-821w.onrender.com/api/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            
            // Проверяем, успешен ли был ответ от сервера
            if (!response.ok) {
                // Если сервер вернул ошибку, выводим ее
                const errorData = await response.json();
                throw new Error(errorData.message || 'Что-то пошло не так');
            }
            
            // Если все хорошо
            closeModal(); // Закрываем форму

            // Показываем сообщение "Спасибо"
            thankYouMessage.classList.remove('hidden');

            // Скрываем сообщение через 3 секунды
            setTimeout(() => {
                thankYouMessage.classList.add('hidden');
            }, 3000);

        } catch (error) {
            // Если не удалось связаться с сервером или пришла ошибка
            console.error('Ошибка при отправке заказа:', error);
            alert(`Ошибка: ${error.message}`); // Показываем пользователю сообщение об ошибке
        }
    });


    // --- ИНИЦИАЛИЗАЦИЯ ---
    renderMenu(); // Вызываем функцию отрисовки меню при загрузке страницы
});


