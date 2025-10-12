// Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {

    // --- ДАННЫЕ О ТОВАРАХ ---
    // В реальном проекте эти данные могут приходить с сервера
    const menuData = [
        { id: 1, name: 'Чизбургер', price: 150, image: 'https://via.placeholder.com/300x200.png?text=Чизбургер' },
        { id: 2, name: 'Гамбургер', price: 130, image: 'https://via.placeholder.com/300x200.png?text=Гамбургер' },
        { id: 3, name: 'Картофель Фри', price: 80, image: 'https://via.placeholder.com/300x200.png?text=Картофель+Фри' },
        { id: 4, name: 'Наггетсы (6 шт)', price: 120, image: 'https://via.placeholder.com/300x200.png?text=Наггетсы' },
        { id: 5, name: 'Пицца "Пепперони"', price: 450, image: 'https://via.placeholder.com/300x200.png?text=Пицца' },
        { id: 6, name: 'Шаурма с курицей', price: 180, image: 'https://via.placeholder.com/300x200.png?text=Шаурма' },
        { id: 7, name: 'Хот-дог', price: 100, image: 'https://via.placeholder.com/300x200.png?text=Хот-дог' },
        { id: 8, name: 'Кока-Кола (0.5л)', price: 70, image: 'https://via.placeholder.com/300x200.png?text=Кола' },
        { id: 9, name: 'Салат "Цезарь"', price: 220, image: 'https://via.placeholder.com/300x200.png?text=Салат+Цезарь' },
        { id: 10, name: 'Молочный коктейль', price: 140, image: 'https://via.placeholder.com/300x200.png?text=Коктейль' },
        { id: 11, name: 'Двойной бургер', price: 250, image: 'https://via.placeholder.com/300x200.png?text=Двойной+бургер' },
        { id: 12, name: 'Сырные палочки', price: 110, image: 'https://via.placeholder.com/300x200.png?text=Сырные+палочки' },
        { id: 13, name: 'Луковые кольца', price: 90, image: 'https://via.placeholder.com/300x200.png?text=Луковые+кольца' },
        { id: 14, name: 'Спрайт (0.5л)', price: 70, image: 'https://via.placeholder.com/300x200.png?text=Спрайт' },
        { id: 15, name: 'Сок апельсиновый', price: 80, image: 'https://via.placeholder.com/300x200.png?text=Сок' },
        { id: 16, name: 'Чай (черный/зеленый)', price: 50, image: 'https://via.placeholder.com/300x200.png?text=Чай' },
        { id: 17, name: 'Кофе Американо', price: 100, image: 'https://via.placeholder.com/300x200.png?text=Кофе' }
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
                    <p class="price">${item.price} ₽</p>
                </div>
            `;
            menuGrid.insertAdjacentHTML('beforeend', menuItemHTML);
        });
    }

    // Функция для открытия модального окна с данными о товаре
    function openModal(item) {
        currentQuantity = 1; // Сбрасываем количество до 1
        updateQuantityDisplay();
        
        // Заполняем информацию о товаре в модальном окне
        modalItemInfo.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">${item.price} ₽</p>
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

    // --- Добавьте эту переменную в начало вашего скрипта, где другие переменные
    let currentSelectedItem = null; 

    // --- Найдите вашу функцию openModal и добавьте одну строчку
    function openModal(item) {
        currentSelectedItem = item; // <-- ДОБАВЬТЕ ЭТУ СТРОКУ, чтобы запомнить товар
        currentQuantity = 1; 
        updateQuantityDisplay();
        
        modalItemInfo.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">${item.price} ₽</p>
        `;
        
        modal.classList.remove('hidden');
    }

    // --- А ТЕПЕРЬ ПОЛНОСТЬЮ ЗАМЕНИТЕ ВАШ СТАРЫЙ ОБРАБОТЧИК ФОРМЫ НА ЭТОТ ---
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;
	const customerComment = document.getElementById('customer-comment').value;

        // Собираем данные для отправки на сервер
        const orderData = {
            itemName: currentSelectedItem.name,
            quantity: currentQuantity,
            customerName: customerName,
            customerPhone: customerPhone,
	    customercomment: customerComment
        };
        
        try {
            // Отправляем данные на наш backend сервер
            const response = await fetch('http://localhost:3000/api/submit-order', {
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