const MAX = 142;
const textareas = document.querySelectorAll('.input-textarea') as NodeList;

textareas.forEach((item) => {
  const targetWrapper = item as HTMLElement;
  const textarea = targetWrapper.querySelector('textarea') as HTMLElement;
  const output = targetWrapper.querySelector('.input-textarea__count') as HTMLElement;

  textarea.addEventListener('input', (event:Event) => {
    const target = event.currentTarget as HTMLInputElement;
    let val = target.value;

    if(MAX <= Number(val.length - 1)) {
      target.value = target.value.slice(0, MAX);
      
      val = target.value;
    } 

    output.innerHTML = String(val.length);
  });
})