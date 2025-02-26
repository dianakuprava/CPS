import '../scss/style.scss';

import { Swiper } from 'swiper';

let brandsSwiper, devicesSwiper, pricesSwiper;

function initSwipers() {
  const mobileBreakpoint = 768;

  if (window.innerWidth < mobileBreakpoint && !brandsSwiper) {
    brandsSwiper = new Swiper('.brands:not(.brands--devices):not(.brands--prices) .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      loop: false,
      resistance: false,
      pagination: {
        el: '.brands:not(.brands--devices):not(.brands--prices) .swiper-pagination',
        clickable: true,
      },
    });
  }

  if (window.innerWidth < mobileBreakpoint && !devicesSwiper) {
    devicesSwiper = new Swiper('.brands--devices .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      loop: false,
      resistance: false,
      pagination: {
        el: '.brands--devices .swiper-pagination',
        clickable: true,
      },
    });
  }

  if (window.innerWidth < mobileBreakpoint && !pricesSwiper) {
    pricesSwiper = new Swiper('.prices__table', {
      wrapperClass: 'prices__table-body',
      slideClass: 'prices__table-row',
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      loop: false,
      resistance: false,
      pagination: {
        el: '.brands--prices .swiper-pagination',
        clickable: true,
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', initSwipers);

document.querySelectorAll('.directions-link').forEach(btn => {
  btn.addEventListener('click', function() {
    const textBlock = this.closest('.about-us').querySelector('.about-us__text');
    textBlock.classList.toggle('about-us__text--expand');
    this.textContent = textBlock.classList.contains('about-us__text--expand') ? 'Свернуть' : 'Читать далее';
  });
});

document.querySelectorAll('.directions-link--show-more').forEach(btn => {
  btn.addEventListener('click', function() {
    const section = this.closest('.brands');
    const swiperWrapper = section.querySelector('.swiper-wrapper');

    section.classList.toggle('expanded');
    swiperWrapper.style.height = section.classList.contains('expanded') ? 'auto' : '160px';

    if (window.swipers) swipers.forEach(swiper => swiper.update());

    this.textContent = section.classList.contains('expanded') ? 'Скрыть' : 'Показать все';
  });
});

const burgerButton = document.querySelector('.round-icon--burger');
const openMenu = document.querySelector('.open-menu');
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';

function toggleMenu() {
  openMenu.classList.toggle('open-menu--open');
  menuOverlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

if (burgerButton && openMenu) {
  burgerButton.addEventListener('click', toggleMenu);
  openMenu.querySelector('.open-menu__close').addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);
  document.body.appendChild(menuOverlay);
}

const modalOverlay = document.createElement('div');
modalOverlay.className = 'overlay';
document.body.appendChild(modalOverlay);

function openModal(modal) {
  modal.classList.add('callback--open');
  modalOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function openFeedback(feedback) {
  feedback.classList.add('feedback--open');
  modalOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModals() {
  document.querySelectorAll('.callback, .feedback').forEach(modal => {
    modal.classList.remove('callback--open', 'feedback--open');
  });
  modalOverlay.style.display = 'none';
  document.body.style.overflow = '';
}

document.querySelectorAll('.round-icon--call').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(document.querySelector('.callback'));
  });
});

document.querySelectorAll('.round-icon--chat').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openFeedback(document.querySelector('.feedback'));
  });
});

document.querySelectorAll('.callback__close').forEach(btn => {
  btn.addEventListener('click', closeModals);
});

document.querySelectorAll('.feedback__close').forEach(btn => {
  btn.addEventListener('click', closeModals);
});

modalOverlay.addEventListener('click', closeModals);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModals();
});

