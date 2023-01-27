/// <reference path="./globals.d.ts" />
import * as url from '../image/map.svg';

window.addEventListener('DOMContentLoaded', () => {
  const menuBtnOpen = document.querySelector('.open-menu') as HTMLElement;
  const menuBtnClose = document.querySelector('.close-menu') as HTMLElement;

  menuBtnOpen.addEventListener('click', () => {
    const menu = document.querySelector('.header__nav') as HTMLElement;

    menu.classList.add('header__nav_show');
  });

  menuBtnClose.addEventListener('click', () => {
    const menu = document.querySelector('.header__nav_show') as HTMLElement;

    menu.classList.remove('header__nav_show');
  });

  const toggler = document.querySelectorAll('.toggler') as NodeList;

  toggler.forEach((item) => {
    item.addEventListener('click', (event: Event) => {
      const target = event.currentTarget as HTMLElement;

      target.classList.toggle('toggler_active');
    });
  });

  if(document.getElementById('map-1')) {
    ymaps.ready(init);

    let myMap:any;

    function init() {
        myMap = new ymaps.Map('map-1', {
            center: [55.8782557, 37.65372],
            zoom: 14,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });
  
      var placemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: url.default,
        // Размеры метки.
        iconImageSize: [30, 52],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -40]
      });
      // Добавим метку на карту.
      myMap.geoObjects.add(placemark);
    }
  }

  let address:any = $(".address");
  let urlDadata = "https://cleaner.dadata.ru/api/v1/clean/address";
  let token = "914ab8da02a92643b5ac222a3f65bf5164eed669";
  let secret = "017b1f28eff7da6e0b5ba963d4da53c75187c70e";

  address.suggestions({
    token: "914ab8da02a92643b5ac222a3f65bf5164eed669",
    type: "ADDRESS",
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function(suggestion:any) {
        console.log(suggestion);
        
        let query = "москва сухонская 11";

        let options:any = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token,
                "X-Secret": secret
            },
            body: JSON.stringify([query])
          }

        fetch(urlDadata, options)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log("error", error));
    }
  });
});