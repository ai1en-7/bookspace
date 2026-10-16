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
// Функция для отрисовки секции избранного
function renderFavorites() {
    if (!favoritesGrid) return;

    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `<p class="favorites__empty fade-in">Ваш список избранного пока пуст.</p>`;
        return;
    }

    favorites.forEach((book, index) => {
        const favCard = document.createElement('article');
        favCard.classList.add('book-card', 'fade-in');
        favCard.innerHTML = `
            <img src="${book.imgSrc}" alt="Обложка книги" class="book-card__img">
            <div class="book-card__content">
                <h3 class="book-card__title">${book.title}</h3>
                <p class="book-card__author">${book.author}</p>
                <span class="book-card__genre">${book.genre}</span>
                <p class="book-card__desc">${book.desc}</p>
                <button type="button" class="btn btn--secondary remove-fav-btn" data-index="${index}">Удалить</button>
            </div>
        `;
        favoritesGrid.appendChild(favCard);
    });
}

// Удаление из избранного
if (favoritesGrid) {
    favoritesGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-fav-btn')) {
            const index = e.target.getAttribute('data-index');
            favorites.splice(index, 1);
            renderFavorites();
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {

    // === 1. База данных книг ===
    const booksData = [
        {
            id: 1,
            title: 'Накануне звезды',
            author: 'Анна Снежная',
            genre: 'romance',
            genreTitle: 'Романтика',
            moods: ['romance', 'relax'],
            desc: 'История о первой любви, летних ночах и надеждах на будущее.',
            img: 'placeholder.jpg'
        },
        {
            id: 2,
            title: 'Тайна заброшенного острова',
            author: 'Максим Квест',
            genre: 'adventure',
            genreTitle: 'Приключения',
            moods: ['adventure'],
            desc: 'Захватывающие поиски сокровищ и опасные испытания в океане.',
            img: 'placeholder.jpg'
        },
        {
            id: 3,
            title: 'Код реальности',
            author: 'Илья Бот',
            genre: 'fiction',
            genreTitle: 'Фантастика',
            moods: ['think', 'adventure'],
            desc: 'Что будет, если искусственный интеллект начнет управлять снами?',
            img: 'placeholder.jpg'
        },
        {
            id: 4,
            title: 'Искусство успевать',
            author: 'Ольга Ментал',
            genre: 'psychology',
            genreTitle: 'Психология',
            moods: ['think', 'relax'],
            desc: 'Простые техники тайм-менеджмента для студентов и школьников.',
            img: 'placeholder.jpg'
        }
    ];

    // Состояние избранного
    let favorites = [];

    // === DOM Элементы ===
    const catalogGrid = document.getElementById('catalog-grid');
    const favoritesGrid = document.getElementById('favorites-grid');
    const searchInput = document.getElementById('search-input');
    const genreSelect = document.getElementById('genre-select');
    const moodCards = document.querySelectorAll('.mood-card');
    const heroBtn = document.querySelector('.hero__btn');

    // === 2. Функция отрисовки каталога ===
    function renderCatalog(books) {
        if (!catalogGrid) return;
        catalogGrid.innerHTML = '';

        if (books.length === 0) {
            catalogGrid.innerHTML = `<p class="favorites__empty fade-in">Книги по вашему запросу не найдены.</p>`;
            return;
        }

        books.forEach((book) => {
            const isFav = favorites.some(fav => fav.id === book.id);

            const card = document.createElement('article');
            card.className = 'book-card fade-in';
            card.setAttribute('data-genre', book.genre);
            card.innerHTML = `
                <img src="${book.img}" alt="${book.title}" class="book-card__img">
                <div class="book-card__content">
                    <h3 class="book-card__title">${book.title}</h3>
                    <p class="book-card__author">Автор: ${book.author}</p>
                    <span class="book-card__genre">${book.genreTitle}</span>
                    <p class="book-card__desc">${book.desc}</p>
                    <button type="button" 
                            class="btn ${isFav ? 'btn--primary btn--active' : 'btn--secondary'} book-card__fav-btn" 
                            data-id="${book.id}">
                        ${isFav ? 'В избранном' : 'В избранное'}
                    </button>
                </div>
            `;
            catalogGrid.appendChild(card);
        });
    }

    // === 3. Фильтрация книг (поиск, жанры и настроение) ===
    let activeMood = null;

    function filterBooks() {
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedGenre = genreSelect ? genreSelect.value : 'all';

        const filtered = booksData.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchText) || 
                                  book.author.toLowerCase().includes(searchText);
            const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
            const matchesMood = !activeMood || book.moods.includes(activeMood);

            return matchesSearch && matchesGenre && matchesMood;
        });

        renderCatalog(filtered);
    }

    // Обработка ввода в поиск и выбор жанра
    if (searchInput) searchInput.addEventListener('input', filterBooks);
    if (genreSelect) genreSelect.addEventListener('change', filterBooks);

    // === 4. Подбор по настроению ===
    moodCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedMood = card.getAttribute('data-mood');
            
            // Если повторно кликаем по тому же настроению — сбрасываем фильтр
            if (activeMood === selectedMood) {
                activeMood = null;
            } else {
                activeMood = selectedMood;
            }

            filterBooks();

            // Плавный переход к каталогу
            const catalogSection = document.getElementById('catalog');
            if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Плавный переход с кнопки Hero «Подобрать книгу»
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const moodSection = document.getElementById('mood');
            if (moodSection) {
                moodSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // === 5. Добавление и удаление из Избранного ===
    function renderFavorites() {
        if (!favoritesGrid) return;
        favoritesGrid.innerHTML = '';

        if (favorites.length === 0) {
            favoritesGrid.innerHTML = `<p class="favorites__empty fade-in">Ваш список избранного пока пуст.</p>`;
            return;
        }

        favorites.forEach((book) => {
            const card = document.createElement('article');
            card.className = 'book-card fade-in';
            card.innerHTML = `
                <img src="${book.img}" alt="${book.title}" class="book-card__img">
                <div class="book-card__content">
                    <h3 class="book-card__title">${book.title}</h3>
                    <p class="book-card__author">Автор: ${book.author}</p>
                    <span class="book-card__genre">${book.genreTitle}</span>
                    <p class="book-card__desc">${book.desc}</p>
                    <button type="button" class="btn btn--secondary remove-fav-btn" data-id="${book.id}">Удалить</button>
                </div>
            `;
            favoritesGrid.appendChild(card);
        });
    }

    // Клик по кнопке "В избранное" в каталоге
    if (catalogGrid) {
        catalogGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('book-card__fav-btn')) {
                const btn = e.target;
                const bookId = parseInt(btn.getAttribute('data-id'), 10);
                const book = booksData.find(b => b.id === bookId);

                const existingIndex = favorites.findIndex(f => f.id === bookId);

                // Добавляем анимацию нажатия
                btn.classList.add('pulse-animation');
                setTimeout(() => btn.classList.remove('pulse-animation'), 350);

                if (existingIndex === -1) {
                    favorites.push(book);
                    btn.textContent = 'В избранном';
                    btn.classList.add('btn--primary', 'btn--active');
                    btn.classList.remove('btn--secondary');
                } else {
                    favorites.splice(existingIndex, 1);
                    btn.textContent = 'В избранное';
                    btn.classList.remove('btn--primary', 'btn--active');
                    btn.classList.add('btn--secondary');
                }

                renderFavorites();
            }
        });
    }

    // Удаление из избранного в блоке "Избранное"
    if (favoritesGrid) {
        favoritesGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-fav-btn')) {
                const bookId = parseInt(e.target.getAttribute('data-id'), 10);
                favorites = favorites.filter(f => f.id !== bookId);
                
                renderFavorites();
                filterBooks(); // Обновляем состояние кнопок в основном каталоге
            }
        });
    }

    // Первичная инициализация
    filterBooks();
    renderFavorites();
});