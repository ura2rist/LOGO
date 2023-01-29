const menuBtnOpen = document.querySelector('.open-menu') as HTMLElement;
const menuBtnClose = document.querySelector('.close-menu') as HTMLElement;

menuBtnOpen.addEventListener('click', () => {
  const menu = document.querySelector('.header__nav') as HTMLElement;

  document.querySelector('body')?.classList.add('lock');

  menu.classList.add('header__nav_show');
});

menuBtnClose.addEventListener('click', () => {
  const menu = document.querySelector('.header__nav_show') as HTMLElement;

  document.querySelector('body')?.classList.remove('lock');

  menu.classList.remove('header__nav_show');
});