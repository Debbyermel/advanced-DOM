'use strict';
///////////////////////////////////////
// Global variables
const header = document.querySelector('.header');
const nav = document.querySelector('.nav')

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (evt) {
  evt.preventDefault();
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

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
  we use cookies to improve functionality. <button class="btn btn--close-cookie">Go it!</button>`;

header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
});

message.style.backgroundColor = '#37383d';

// Changing the value of a CSS variable
document.documentElement.style.setProperty('--color-primary', 'yellowgreen' );


///////////////////////////////////////
// Button Smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Smooth scroll modern browsers
btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({ behavior: 'smooth' });
})

///////////////////////////////////////
//Nav scroll with Event Delegation
//smooth scroll on the page navigation using event delegation
// 1.add event listener to the parent element
// 2.determine what element originated the event
// 3.Match strategy (ignore clicks that is not the target)
document.querySelector('.nav__links').addEventListener('click', function(e) {
  console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
//Tab component with DOM Traversing/event delegation
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if(!clicked) return;

  //Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  //Activated tab
  clicked.classList.add('operations__tab--active');

  //Activated content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
//Menu fade animation with event delegation

function handleHover(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblingsLink = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblingsLink.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//Passing an "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//Building a sticky nav-bar using the Intersection observer API

const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


///////////////////////////////////////
//Revealing sections using the Intersection observer API

const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('.section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('.section--hidden');
});

///////////////////////////////////////
//Lazy Loading using Intersection Observer

const imgTargets = document.querySelectorAll('img[data-src]');

function loadingImages(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  //replace the data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadingImages, {
  root: null,
  threshold: 0,
  remove: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//Slider
const slides = document.querySelectorAll('slide');
const slider = document.querySelector('slider');
let currentSlide = 0;
const maxSlide = slides.length;
const btnLeft = document.querySelector('slider__btn--left');
const btnRight = document.querySelector('slider__btn--right');

function goToSlide(slide) {
  slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - slide)}%)`);
};
goToSlide(0);

function nextSlide(){
  if(currentSlide === maxSlide - 1) {
    currentSlide = 0;
  }
  else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

function prevSlide(){
  if(currentSlide === 0) {
    currentSlide = maxSlide - 1;
  }
  else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
