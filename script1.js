// Конфигурация - ЗАМЕНИТЕ НА СВОИ ДАННЫЕ
const config = {
    telegramUsername: 'lvmalahova', // Без @
    whatsappNumber: '79370862719',    // Формат: 79XXXXXXXXX
    defaultMessage: ''
};

// Текущий выбранный продукт
let currentProduct = '';

// Функция для открытия модального окна (ГЛОБАЛЬНАЯ)
function openMessengerModal(productName) {
    currentProduct = productName;
    const modal = document.getElementById('messengerModal');
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Обновляем ссылки для выбранного продукта
        updateMessengerLinks(productName);
        
        // Обновляем заголовок
        const title = modal.querySelector('h3');
        if (title) {
            title.textContent = `Выберите удобный мессенджер!`;
        }
    }
}

// Функция для закрытия модального окна (ГЛОБАЛЬНАЯ)
function closeMessengerModal() {
    const modal = document.getElementById('messengerModal');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Функция для обновления ссылок мессенджеров
function updateMessengerLinks(productName) {
    // Формируем текст сообщения
    const message = `${productName}`;
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем ссылки
    const telegramUrl = `https://t.me/${config.telegramUsername}?text=${encodedMessage}`;
    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
    
    // Обновляем ссылки в кнопках
    const telegramLink = document.getElementById('telegramLink');
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (telegramLink) {
        telegramLink.href = telegramUrl;
        telegramLink.target = '_blank';
    }
    
    if (whatsappLink) {
        whatsappLink.href = whatsappUrl;
        whatsappLink.target = '_blank';
    }
}

// Остальной код внутри DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for header nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('[data-accordion] .accordion__item').forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const content = item.querySelector('.accordion__content');
    if (!trigger || !content) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('[data-accordion] .accordion__item.is-open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('is-open');
      });
      item.classList.toggle('is-open', !isOpen);
      // Adjust height for transition
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });

  // Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Carousels (multiple)
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const items = Array.from(carousel.querySelectorAll('.carousel__item'));
    const prev = carousel.querySelector('.carousel__btn--prev');
    const next = carousel.querySelector('.carousel__btn--next');
    let index = 0;

    const itemGap = 24; // must match CSS gap
    const getPerView = () => {
      const w = carousel.querySelector('.carousel__viewport').clientWidth;
      if (w < 920) return 1;
      return 3;
    };

    function update() {
      const perView = getPerView();
      const viewport = carousel.querySelector('.carousel__viewport');
      const itemWidth = (viewport.clientWidth - itemGap * (perView - 1)) / perView;
      const maxIndex = Math.max(0, items.length - perView);
      index = Math.min(Math.max(0, index), maxIndex);
      const offset = index * (itemWidth + itemGap);
      track.style.transform = `translateX(${-offset}px)`;
    }

    if (prev) prev.addEventListener('click', () => { index -= 1; update(); });
    if (next) next.addEventListener('click', () => { index += 1; update(); });
    window.addEventListener('resize', update);
    update();
  });

  // Закрытие модального окна при клике вне его области
  document.addEventListener('click', function(event) {
      const modal = document.getElementById('messengerModal');
      if (event.target === modal) {
          closeMessengerModal();
      }
  });

  // Закрытие модального окна по клавише Escape
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
          closeMessengerModal();
      }
  });

  // Автоматическая инициализация кнопок по data-атрибутам
  const messengerButtons = document.querySelectorAll('[data-messenger-product]');
  
  messengerButtons.forEach(button => {
      const productName = button.getAttribute('data-messenger-product');
      button.addEventListener('click', () => openMessengerModal(productName));
  });
});