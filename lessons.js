///////////////////////////////////////
// Events add/remove
const h1 = document.querySelector('h1');

const alertH1 = function(e) {
  alert('add event on h1')
  h1.removeEventListener('mouseenter', alertH1);
}

setTimeout(() => h1.addEventListener('mouseenter', alertH1), 3000);

///////////////////////////////////////
//Scrolling and inspect window height/width

//Smooth scroll (old way)
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top:  s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  //Checking current scroll
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //Checking wight and height
  console.log(
    'height and width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
})

///////////////////////////////////////
//Class add/remove/toggle
logo.classList.add('disable', 'with-opacity');
logo.classList.contains('disable');
logo.classList.toggle('visible');

///////////////////////////////////////
//Inspecting de height add by css file
console.log(getComputedStyle(message).height);

///////////////////////////////////////
//Inspecting de url wrote on html
console.log(logo.getAttribute('src'));

///////////////////////////////////////
//Inspecting the url absolute
const link = document.querySelector('.nav__link--btn');
console.log(link.href);

///////////////////////////////////////
// Inspecting Data attributes
console.log(logo.dataset.versionNumber);

///////////////////////////////////////
//Event Propagation
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
  //event will not bubble to the parent ones
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
}, true);
//Passing the true will make the event by listening on the capturing phase(Going down)


///////////////////////////////////////
//Event target not efficient because it is attached to each link instead the be on he parent and get the target element.
document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});