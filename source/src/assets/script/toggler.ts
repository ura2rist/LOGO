const toggler = document.querySelectorAll('.toggler') as NodeList;

toggler.forEach((item) => {
  item.addEventListener('click', (event: Event) => {
    const target = event.currentTarget as HTMLElement;

    target.classList.toggle('toggler_active');
  });
});