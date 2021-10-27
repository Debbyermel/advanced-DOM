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
