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

///////////////////////////////////////
//DOM Traversing
const h1 = document.querySelector('h1');

//going down: children
h1.querySelectorAll('.highlighted');

//Direct children
h1.children
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'green';

//going up: direct parent
h1.parentNode;
h1.parentElement;
h1.closest('.header').style.background = 'var(--gradient-primary)';

//going sideways: selecting siblings
h1.previousElementSibling;
h1.nextElementSibling;

//selecting all siblings
h1.parentElement.children;
[...h1.parentElement.children].forEach(function(el) {
  if(el !== h1) {
    el.style.transform = 'scale(0.6)';
  }
})

///////////////////////////////////////
//Building a sticky nav-bar with scroll-event (BAD WAY)!!!
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function() {

  if(window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('stick');
  }
});

/////////////////////////////////////////
//// Intersection Observer API
//Observes changes to the way a target element intersects an element
const observerCallback = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
};

const observerOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(elementToObserve);