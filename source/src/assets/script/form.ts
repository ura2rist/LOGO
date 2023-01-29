const formBtn = document.querySelector('.total__btn') as HTMLElement;

formBtn.addEventListener('click', () => {
  const req = document.querySelectorAll('.input-req') as NodeList;
  const empty = checkEmptyInput(req);

  if(empty) {
    const formData = new FormData();
    const name = document.querySelector('.name') as HTMLInputElement;
    const surname = document.querySelector('.surname') as HTMLInputElement;
    const address = document.querySelector('.address') as HTMLInputElement;
    const mail = document.querySelector('.mail') as HTMLInputElement;
    const phone = document.querySelector('.phone') as HTMLInputElement;
    const products = document.querySelectorAll('.products__info') as NodeList;
    const payment = document.querySelector('.radio__input:checked') as HTMLInputElement;
    const comment = document.querySelector('.comment') as HTMLInputElement;
    let product:IProducts[] = [];

    interface IProducts {
      name:string,
      article:string,
      amount:number,
      color:string,
      size:string
    }

    const data = {
      name: name.value,
      surname: surname.value,
      address: address.value,
      mail: mail.value,
      phone: phone.value,
      payment: payment.value,
      comment: comment.value
    }

    products.forEach((item) => {
      const element = item as HTMLElement;

      if(!element.classList.contains('products__info_hidden')) {
        const amount = element.querySelector('.number__input') as HTMLInputElement;
        const color = element.querySelector('.products__color-radio:checked') as HTMLInputElement;
        const size = element.querySelector('.products__size-radio:checked') as HTMLInputElement;

        product.push({
          name: element.querySelector('.products__name')?.textContent as string,
          article: element.querySelector('.products__charact-description')?.textContent as string,
          amount: Number(amount.value),
          color: color.value,
          size: size.value
        })
      }
    });

    formData.append('person', JSON.stringify(data));
    formData.append('products', JSON.stringify(product));

    let check = [JSON.parse(formData.getAll('person') as any), JSON.parse(formData.getAll('products') as any)];
    console.log(check)
  }
});

function checkEmptyInput(req: NodeList): boolean {
  if(!req.length) return true;

  let status: boolean = true;

  req.forEach((item) => {
    const targetWrapper = item as HTMLElement;
    const input = targetWrapper.querySelector('input, textarea') as HTMLInputElement;
    const val = input.value.trim().length;
    const text = targetWrapper.querySelector('.input-error__message') as HTMLElement;
    
    if(targetWrapper.classList.contains('error')) {
      targetWrapper.classList.remove('error', 'input-error');
    }

    if(Number(val) <= 0) {
      targetWrapper.classList.add('error', 'input-error');
      text.textContent = 'Пустое поле';

      status = false;
    }
  })

  return status;
}