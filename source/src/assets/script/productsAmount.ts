const products = document.querySelectorAll('.number') as NodeList;

products.forEach((item) => {
  const amount = item as HTMLElement;

  amount.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const targetCurr = event.currentTarget as HTMLElement;
    const input = targetCurr.querySelector('.number__input') as HTMLInputElement;
    let value = Number(input.value);
    
    if(target.classList.contains('number__decrement')) {
      value--;

      if(value < 1) return;

    } else if(target.classList.contains('number__increment')) {
      value++;
    }

    input.value = String(value);

  });
})