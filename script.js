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

//Inspecting de height
console.log(getComputedStyle(message).height);

//Inspecting de url wrote on html
console.log(logo.getAttribute('src'));

//Inspecting the url absolute
const link = document.querySelector('.nav__link--btn');
console.log(link.href);

// Data attributes
console.log(logo.dataset.versionNumber);

// Changing the value of a CSS variable
document.documentElement.style.setProperty('--color-primary', 'yellowgreen' );

//Class add/remove/toggle
logo.classList.add('disable', 'with-opacity');
logo.classList.contains('disable');
logo.classList.toggle('visible');


///////////////////////////////////////
// Smooth scroll

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Smooth scroll modern browsers
btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({ behavior: 'smooth' });
})


//Smooth scroll (old way)
//btnScrollTo.addEventListener('click', function(e) {
  // const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top:  s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //Checking current scroll
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //Checking wight and height
  // console.log(
  //   'height and width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
//})

