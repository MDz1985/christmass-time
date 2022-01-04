import snow from '../components/snow';
import { objFromLS } from './consts';
// import { localStorageObject } from './consts';
// const objectFromLS = JSON.parse(<string>localStorage.getItem('object'));
// const lsObject = localStorageObject;

// function firstLsSet() {
//   // if (!localStorage.getItem('object')) {
//     localStorage.setItem('object', JSON.stringify(localStorageObject));
//   // }
// }

//   localStorage.removeItem('name');
//   if (!localStorage.getItem('sort')) {
//     localStorage.setItem('sort', 'ascending');
//   }
//
//   if (!localStorage.getItem('counts')) {
//     localStorage.setItem('counts', '0 12');
//   }
//   if (!localStorage.getItem('years')) {
//     localStorage.setItem('years', '1940 2021');
//   }
//   if (!localStorage.getItem('shape')) {
//     localStorage.setItem('shape', 'шар снежинка фигурка колокольчик шишка');
//   }
//   if (!localStorage.getItem('color')) {
//     localStorage.setItem('color', 'красный синий белый зелёный желтый');
//   }
//   if (!localStorage.getItem('size')) {
//     localStorage.setItem('size', 'большой средний малый');
//   }
//   if (!localStorage.getItem('favorite')) {
//     localStorage.setItem('favorite', 'да нет');
//   }
// }

function rmFromLS(key: string, value: string) {
  const obj = objFromLS;
  obj[key] = obj[key].filter((word: string) => word !== value);
  localStorage.setItem('object', JSON.stringify(obj));
}

// function rmFromLS(key: string, value: string) {
//   const lsValue = localStorage.getItem(key);
//   const result = lsValue.split(' ').filter(word => word !== value).join(' ');
//   localStorage.setItem(key, result);
// }
//
function addToLS(key: string, value: string) {
  const obj = objFromLS;
  obj[key] = obj[key].filter((word: string) => word !== value);
  obj[key].push(value);

  localStorage.setItem('object', JSON.stringify(obj));
}

// function addToLS(key: string, value: string) {
//   const lsValue = localStorage.getItem(key);
//   const resultArray = lsValue.split(' ').filter(word => word !== value);
//   resultArray.push(value);
//   const result = resultArray.join(' ');
//   localStorage.setItem(key, result);
// }

function getRandom() {
  return Math.floor((Math.random()) * 900);
}

function getRandomOf(num: number) {
  return Math.floor((Math.random()) * num);
}

function fallSnow(element: HTMLElement) {
  const snowBox = document.createElement('div');
  snowBox.className = 'snow-box';
  element.prepend(snowBox);
  for (let i = 0; i < 50; i++) {
    const snowflake = snow();
    snowflake.style.transform = `translateX(${getRandom() - getRandom()}px)`;
    setTimeout(() => snowBox.appendChild(snowflake), i * 1000);
  }
}

function stopSnow() {
  const body = document.querySelector('.body') as HTMLDivElement;
  if (document.querySelector('.snow-box')) {
    const snowBox = body.querySelector('.snow-box') as HTMLDivElement;
    body.removeChild(snowBox);
  }
}

function setSize(count: number, element: HTMLElement) {
  element.style.width = `${10 / 49 * 100 * count}%`;
}

export {
  // firstLsSet,
  rmFromLS, addToLS,
  getRandom, fallSnow, stopSnow, setSize, getRandomOf };
