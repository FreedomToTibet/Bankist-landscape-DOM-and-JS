'use strict';

///////////////////////////////////////
// Modal window events

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button for scrolling to the first section

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {section1.scrollIntoView({behavior: 'smooth'})});

// old fashion code
// btnScrollTo.addEventListener('click', e => {
//   const s1coords = section1.getBoundingClientRect();

//   window.scrollTo({
//     left: s1coords.left + window.scrollX,
//     top: s1coords.top + window.scrollY,
//     behavior: 'smooth',
//   });
// });

///////////////////////////////////////
// Navigation

document.querySelector('.nav__links').addEventListener('click', e => {
	e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

///////////////////////////////////////
// Tabbed component

const tabsContainer = document.querySelector('.operations__tab-container');

tabsContainer.addEventListener('click', (e) => {
	const clicked = e.target.closest('.operations__tab');

	if (!clicked) return;

	tabsContainer.querySelector('.operations__tab--active').classList.remove('operations__tab--active');
	clicked.classList.add('operations__tab--active');

	document.querySelector('.operations__content--active').classList.remove('operations__content--active');
	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const nav = document.querySelector('.nav');

const handleNavHover = (opacity) => (e) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', handleNavHover(0.5));
nav.addEventListener('mouseout', handleNavHover(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(
	(entries) => {
		const [entry] = entries;
		
		if (!entry.isIntersecting) nav.classList.add('sticky');
		else nav.classList.remove('sticky');
	}
	, {
		root: null,
		threshold: 0,
		rootMargin: `-${navHeight}px`,
	}
);

headerObserver.observe(header);