import * as url from '../image/map.svg';

if(document.getElementById('map-1')) {
  ymaps.ready(init);

  let myMap:any;

  function init() {
    myMap = new ymaps.Map('map-1', {
      center: [55.8782557, 37.65372],
      zoom: 9,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    });

    let address = document.querySelectorAll('.address');
    let token = "914ab8da02a92643b5ac222a3f65bf5164eed669";

    address.forEach((item) => {
      item.addEventListener("input", onChange);
    });

    const dropContent = document.querySelectorAll('.input-dropdown__output') as NodeList;

    document.addEventListener( 'click', (e) => {
      dropContent.forEach((item) => {
        const drop = item as HTMLElement;
        const withinBoundaries = e.composedPath().includes(item);

        if (!withinBoundaries) {
          const active = document.querySelector('.input-dropdown_active') as HTMLElement;

          if(active) active.classList.remove('input-dropdown_active');
        }
      });
    });

    dropContent.forEach((item) => {
      const content = item as HTMLElement;

      content.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        
        if(target.classList.contains('input-dropdown__item')) {
          const parent = target.closest('.input-dropdown') as HTMLElement;
          const address = parent.querySelector(".address") as HTMLInputElement;
          const text = target.textContent as string;

          address.value = text;

          let placemark = new ymaps.Placemark(myMap.getCenter(), {}, {
            iconLayout: 'default#image',
            iconImageHref: url.default,
            iconImageSize: [30, 52],
            iconImageOffset: [-15, -40]
          });
      
         
          let myGeocoder = ymaps.geocode(text);
          myGeocoder.then(
            function (res:any) {
              myMap.geoObjects.removeAll();
              let coords = res.geoObjects.get(0).geometry.getCoordinates();
              placemark.geometry.setCoordinates([coords[0], coords[1]])
                myMap.setCenter([coords[0], coords[1]], 16, {
                checkZoomRange: true
              });
              myMap.geoObjects.add(placemark);
            });

          const active = document.querySelector('.input-dropdown_active') as HTMLElement;

          if(active) active.classList.remove('input-dropdown_active');
        }
      });
    });

    function onChange(e: Event) {
      const target = e.currentTarget as HTMLInputElement;
      const parent = target.closest('.input-dropdown') as HTMLElement;
      const output = parent.querySelector(".input-dropdown__output") as HTMLElement;

      let promise = suggest(target.value);
      promise
        .then(function(response) {
          return response.json();
        })
        .then(function(suggestions) {
          let text:string = '';

          suggestions['suggestions'].forEach((item:any) => {
            text += '<li class="input-dropdown__item">' + item.value + '</li>';
          })

          output.innerHTML = text;

          parent.classList.add('input-dropdown_active');

          if(target.value.trim() === '') {
            parent.classList.remove('input-dropdown_active');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function suggest(query:string) {
      const serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      const request = {
        "query": query
      };
      const params:any = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
      }
      
      return fetch(serviceUrl, params);
    }
  }
}