const heroBtn = document.querySelector('.hero__btn');
if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#mood');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
// Пример добавления класса анимации при выводе карточек
function renderCards(cardsArray) {
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = '';
    
    if (cardsArray.length === 0) {
        grid.innerHTML = `<p class="favorites__empty fade-in">Книги не найдены.</p>`;
        return;
    }

    cardsArray.forEach((card, index) => {
        // Добавляем класс с задержкой для красивого каскадного появления (опционально)
        card.classList.add('fade-in');
        grid.appendChild(card);
    });
}
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('book-card__fav-btn')) {
        const btn = e.target;
        
        // Запуск анимации пульсации
        btn.classList.add('pulse-animation');
        setTimeout(() => {
            btn.classList.remove('pulse-animation');
        }, 300);

        // Здесь продолжает выполняться ваша стандартная логика добавления в избранное...
    }
});
// Массив для хранения избранных книг
let favorites = [];

// Обработчик кликов по всему каталогу (делегирование событий)
const catalogGrid = document.getElementById('catalog-grid');
const favoritesGrid = document.getElementById('favorites-grid');

if (catalogGrid) {
    catalogGrid.addEventListener('click', (e) => {
        // Проверяем, что кликнули именно по кнопке добавления в избранное
        if (e.target.classList.contains('book-card__fav-btn')) {
            const card = e.target.closest('.book-card');
            
            // Получаем данные книги из карточки
            const title = card.querySelector('.book-card__title').textContent;
            const author = card.querySelector('.book-card__author').textContent;
            const genre = card.querySelector('.book-card__genre').textContent;
            const desc = card.querySelector('.book-card__desc').textContent;
            const imgSrc = card.querySelector('.book-card__img').getAttribute('src');

            // Создаем объект книги
            const bookData = { title, author, genre, desc, imgSrc };

            // Проверяем, есть ли уже эта книга в избранном (чтобы не дублировать)
            const isAlreadyFavorite = favorites.some(book => book.title === title);

            if (!isAlreadyFavorite) {
                favorites.push(bookData);
                renderFavorites();
                
                // Анимация пульсации кнопки при успешном добавлении
                e.target.classList.add('pulse-animation');
                e.target.textContent = 'В избранном';
                setTimeout(() => {
                    e.target.classList.remove('pulse-animation');
                }, 300);
            }
        }
    });
}
