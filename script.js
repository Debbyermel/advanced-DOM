'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

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
//Event Delegation
//smooth scroll on the page navigation using event delegation
// 1.add event listener to the parent element
// 2.determine what element originated the event
// 3.Match strategy (ignore clicks that is not the target)
document.querySelector('.nav__links').addEventListener('click', function(e) {
  console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    console.log('link');
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

