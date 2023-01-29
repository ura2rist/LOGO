const deleteProductFirst = document.querySelectorAll('.products__info-delete') as NodeList;

deleteProductFirst.forEach((item) => {
  const close = item as HTMLElement;

  item.addEventListener('click', removeProduct);
})

function removeElement(elements:HTMLElement[]) {
  elements.forEach((element:HTMLElement) => {
    element.remove();
  })
}

function retrieveProduct(event:Event) {
  const target = event.currentTarget as HTMLElement;
  const main = target.closest('.products__info_hidden') as HTMLElement;
  const elements:HTMLElement[] = [main.querySelector('.products__delete') as HTMLElement];

  removeElement(elements);
  main.classList.remove('products__info_hidden');
}

function removeProduct(event:Event) {
  const target = event.currentTarget as HTMLElement;

  if(target.closest('.products__delete')) {
    const elements:HTMLElement[] = [target.closest('.products__info') as HTMLElement];

    removeElement(elements);
  } else {
    const div = document.createElement('div');
    const main = target.closest('.products__info') as HTMLElement;
    const name = main.querySelector('.products__name') as HTMLElement;

    div.classList.add('products__info-wrapper', 'products__delete');

    div.innerHTML = `<div class="products__delete-wrapper">
      <p class="products__delete-message">Товар <span class="products__delete-name">${ name.textContent }</span> был удален из корзины.</p><button class="products__delete-btn">Восстановить</button>
      <div class="products__info-delete">
        <span class="products__info-line"></span>
        <span class="products__info-line"></span>
      </div>
    </div>`;

    div.querySelector('.products__info-delete')?.addEventListener('click', removeProduct);
    div.querySelector('.products__delete-btn')?.addEventListener('click', retrieveProduct);

    target.closest('.products__info')?.classList.add('products__info_hidden');

    target.closest('.products__info')?.append(div);
  }
}