const onlytext = document.querySelectorAll('.onlyText') as NodeList;

onlytext.forEach((item) => {
  const targetWrapper = item as HTMLElement;
  const input = targetWrapper.querySelector('input') as HTMLInputElement;

  input.addEventListener('input', (event:Event) => {
    const target = event.currentTarget as HTMLInputElement;
    target.value = target.value.replace(/[_+=$%^±&*()<>:;"|[\]\\{},.?!~@#/\dA-z]/g,'');
  })
})

function eventCalllback(event: Event) {
  let el = event.target as HTMLInputElement;
  let clearVal = el.dataset.phoneClear;
  let pattern = el.dataset.phonePattern;
  let matrix_def = "+7(___) ___-__-__";
  let matrix = pattern as String ? pattern as String : matrix_def as String;
  let i = 0;
  let def = matrix.replace(/\D/g, "");
  let val = el.value.replace(/\D/g, "");

  if (clearVal !== 'false' && event.type === 'blur') {
    let text = matrix.match(/([\_\d])/g);
    if(text) {
      if (val.length < text.length) {
        el.value = '';
        return;
      }
    }
  }

  if (def.length >= val.length) val = def;
  el.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
  });
}

let phone_inputs = document.querySelectorAll('[data-phone-pattern]');

for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
    }
}