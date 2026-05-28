// Хранилище для товаров в корзине
let cart = [];

// Элементы со страницы
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');

// 1. Логика открытия и закрытия корзины
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    renderCart();
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Закрытие кликом вне окна корзины
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// 2. Добавление товара в корзину
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseInt(card.getAttribute('data-price'));

        // Проверяем, есть ли товар уже в корзине
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCartCounter();
        
        // Красивый эффект на кнопке при добавлении
        const originalText = e.target.innerText;
        e.target.innerText = 'Добавлено! ✓';
        e.target.style.background = '#10b981'; // Зеленый цвет
        setTimeout(() => {
            e.target.innerText = originalText;
            e.target.style.background = '';
        }, 1000);
    });
});

// 3. Обновление счетчика на главной кнопке
function updateCartCounter() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;
}

// 4. Отрисовка товаров внутри корзины и подсчет суммы
function renderCart() {
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-message">Корзина пока пуста</p>';
        cartTotalPrice.innerText = '0';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                <small>${item.price.toLocaleString('ru-RU')} ₸ × ${item.quantity}</small>
            </div>
            <div>
                <span>${itemTotal.toLocaleString('ru-RU')} ₸</span>
            </div>
        `;
        cartItemsList.appendChild(itemElement);
    });

    cartTotalPrice.innerText = total.toLocaleString('ru-RU');
}