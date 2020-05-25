'use strict';

// menu
const leftMenu = document.querySelector('.left-menu'),
  hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

document.body.addEventListener('click', evt => {
  if (!evt.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
});

leftMenu.addEventListener('click', evt => {
  const target = evt.target;
  const dropdown = target.closest('.dropdown');

  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }

  // const dropdown = document.querySelectorAll('.dropdown');

  // dropdown.forEach((el) => {
  //   el.addEventListener('click', () => {
  //     el.classList.toggle('active');
  //   });
  // });
});