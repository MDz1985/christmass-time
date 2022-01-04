import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import main1Html from './index.html';

const main1 = htmlFromString(main1Html) as HTMLElement;
const cardsContainer = main1.querySelector('.cards-container') as HTMLDivElement;

import button from '../button/index';

const aside: HTMLElement | null = main1.querySelector('.aside') as HTMLElement;
const menuButton = main1.querySelector('.menu-button') as HTMLButtonElement;
const closeButton = main1.querySelector('.close-button') as HTMLButtonElement;
menuButton.addEventListener('click', () => {
  aside.style.display = 'flex';
});
closeButton.addEventListener('click', () => {
  aside.style.display = 'none';
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1150) {
    aside.style.display = 'flex';
  }
});


import { objFromLS } from '../../utilites/consts';

const globalObject = objFromLS;


// import setBg from '../../utilites/image-loader';

// let toyButton;
// const toyArray = ['Колокол', 'Шар', 'Шишка', 'Звезда', 'Снежинка', 'Фигурка'];
// for (let i = 0; i < 6; i++) {
//   toyButton = button('toy-button', toyArray[i], () => console.log(7));
// }

// const audio: HTMLAudioElement = document.querySelector('.audio')
const volumeButton = main1.querySelector('.volume-button') as HTMLButtonElement;
const audio = document.querySelector('.audio') as HTMLAudioElement;
if (globalObject.volume.includes('mute')) {
  volumeButton.classList.add('mute_button');
  // audio.volume = 0;
}
volumeButton.addEventListener('click', () => {
  volumeButton.classList.toggle('mute_button');
  if (globalObject.volume.includes('mute')) {
    globalObject.volume = '';
    audio.play();
  } else {
    globalObject.volume = 'mute';
    audio.pause();
  }
  localStorage.setItem('object', JSON.stringify(globalObject));
});



import { fallSnow, stopSnow } from '../../utilites/functions';

const body = document.querySelector('body') as HTMLBodyElement;

const snowButton = button('snow-button', '', () => {
  snowButton.classList.toggle('snow_fallen');
  if (globalObject.snowfall.includes('fall')) {
    globalObject.snowfall = '';
    // localStorage.removeItem('snowfall');
    stopSnow();
  } else {
    globalObject.snowfall = 'fall';
    // localStorage.setItem('snowfall', 'fall');
    fallSnow(body);
  }
  localStorage.setItem('object', JSON.stringify(globalObject));
});
snowButton.classList.remove('button');
snowButton.classList.add('aside_button');

main1.addEventListener('DOMNodeInsertedIntoDocument', updVolSnowBtnStatus);

function updVolSnowBtnStatus() {
  if (globalObject.volume === 'mute') {
    volumeButton.classList.add('mute_button');
  } else volumeButton.classList.remove('mute_button');
  if (globalObject.snowfall.includes('fall')) {
    snowButton.classList.add('snow_fallen');
  } else {
    snowButton.classList.remove('snow_fallen');
  }
}



if (globalObject.snowfall.includes('fall')) {
  snowButton.classList.add('snow_fallen');
  fallSnow(body);
}

volumeButton.after(snowButton);


function addListener(element: NodeListOf<HTMLElement>, array: string[], key: string): void {
  for (let i = 0; i < element.length; i++) {
    if (globalObject[key].includes(array[i])) {
      element[i].classList.add('selected_items');
    } else {
      element[i].classList.remove('selected_items');
    }
    element[i].addEventListener('click', () => {
      if (globalObject[key].includes(array[i])) {
        globalObject[key] = globalObject[key].filter((r: string) => r !== array[i]);
        // if (SortedCards.getValFromLS(key).includes(array[i])) {
        //   rmFromLS(key, array[i]);
      } else {
        globalObject[key].push(array[i]);
        // addToLS(key, array[i]);
      }
      localStorage.setItem('object', JSON.stringify(globalObject));
      element[i].classList.toggle('selected_items');
      cardsContainer.innerHTML = '';
      insertCards();
      // addToLS(key, 'control');

    });
  }
}

function addSelections(element: NodeListOf<HTMLElement>, array: string[], key: string): void {
  for (let i = 0; i < array.length; i++) {
    if (globalObject[key].includes(array[i])) {
      // if (localStorage.getItem(key).split(' ').includes(array[i])) {
      element[i].classList.add('selected_items');
    } else {
      element[i].classList.remove('selected_items');
    }
  }
}

const searchArea = main1.querySelector('.search-form__input') as HTMLInputElement;
searchArea.addEventListener('change', () => {
  // localStorage.setItem('name', searchArea.value);
  globalObject.name = searchArea.value;
  localStorage.setItem('object', JSON.stringify(globalObject));
  cardsContainer.innerHTML = '';
  insertCards();
});
searchArea.addEventListener('mouseleave', () => {
  // localStorage.setItem('name', searchArea.value);
  globalObject.name = searchArea.value;
  localStorage.setItem('object', JSON.stringify(globalObject));
  cardsContainer.innerHTML = '';
  insertCards();
});

const sortSelect = main1.querySelector('.sort__select') as HTMLSelectElement;
if (objFromLS.sort.includes('ascending')) {
  sortSelect.value = 'По возрастанию';
} else {
  sortSelect.value = 'По убыванию';
}
sortSelect.addEventListener('change', () => {
  switch (sortSelect.value) {
    case 'По возрастанию':
      globalObject.sort = ['ascending'];
      // addToLS('sort', 'ascending');
      break;
    case 'По убыванию':
      globalObject.sort = ['descending'];
      // rmFromLS('sort', 'ascending');
      // addToLS('sort', 'descending');
      break;
    case 'По возрастанию (год)':
      globalObject.sort = ['ascending', 'year'];
      // rmFromLS('sort', 'name');
      // addToLS('sort', 'ascending');
      // addToLS('sort', 'year');
      break;
    case 'По убыванию (год)':
      globalObject.sort = ['descending', 'year'];
      // rmFromLS('sort', 'name');
      // rmFromLS('sort', 'ascending');
      // addToLS('sort', 'year');
      break;
    case 'По возрастанию (название)':
      globalObject.sort = ['ascending', 'name'];
      // rmFromLS('sort', 'year');
      // addToLS('sort', 'ascending');
      // addToLS('sort', 'name');
      break;
    case 'По убыванию (название)':
      globalObject.sort = ['descending', 'name'];
      // rmFromLS('sort', 'year');
      // rmFromLS('sort', 'ascending');
      // addToLS('sort', 'name');
      break;
  }
  localStorage.setItem('object', JSON.stringify(globalObject));
  // if (sortSelect.value !== 'По возрастанию') {
  //   rmFromLS('sort', 'ascending');
  //   addToLS('sort', 'descending');
  // } else {
  //   addToLS('sort', 'ascending');
  // }
  //
  // switch (sortSelect.value) {
  //   case 'По возрастанию':
  //     addToLS('sort', 'ascending');
  //     break;
  //   case 'По убыванию':
  //     rmFromLS('sort', 'ascending');
  //     addToLS('sort', 'descending');
  //     break;
  //   case 'По возрастанию (год)':
  //     rmFromLS('sort', 'name');
  //     addToLS('sort', 'ascending');
  //     addToLS('sort', 'year');
  //     break;
  //   case 'По убыванию (год)':
  //     rmFromLS('sort', 'name');
  //     rmFromLS('sort', 'ascending');
  //     addToLS('sort', 'year');
  //     break;
  //   case 'По возрастанию (название)':
  //     rmFromLS('sort', 'year');
  //     addToLS('sort', 'ascending');
  //     addToLS('sort', 'name');
  //     break;
  //   case 'По убыванию (название)':
  //     rmFromLS('sort', 'year');
  //     rmFromLS('sort', 'ascending');
  //     addToLS('sort', 'name');
  //     break;
  // }


  cardsContainer.innerHTML = '';
  insertCards();
});


const favoriteSelectors: NodeListOf<HTMLInputElement> = main1.querySelectorAll('.radio__input');

if (objFromLS.favorite.includes('нет')) {
  favoriteSelectors[0].checked = true;
} else {
  favoriteSelectors[1].checked = true;
}
favoriteSelectors[0].addEventListener('change', () => {
  cardsContainer.innerHTML = '';
  insertCards();
});
favoriteSelectors[1].addEventListener('change', () => {
  cardsContainer.innerHTML = '';
  insertCards();
});


import createSlider from './slider';


main1.addEventListener('DOMNodeInsertedIntoDocument', function insertScroll() {

    const categoriesTitles = main1.querySelectorAll('.categories__title') as NodeListOf<HTMLElement>;
    const countsSlider = createSlider('counts-slider', 'counts', 0, 12, () => {
      cardsContainer.innerHTML = '';
      insertCards();
    }) as noUiSlider.Instance;
    const yearsSlider = createSlider('years-slider', 'years', 1940, 2021, () => {
      cardsContainer.innerHTML = '';
      insertCards();
    });
    categoriesTitles[1].after(countsSlider);
    categoriesTitles[2].after(yearsSlider);

    main1.removeEventListener('DOMNodeInsertedIntoDocument', insertScroll);

  }
);

main1.addEventListener('DOMNodeInsertedIntoDocument', function updateLS() {
  if (!localStorage.getItem('object')) {
    localStorage.setItem('object', JSON.stringify(globalObject));
  }
});


function resetSliders() {
  const countsSlider = document.querySelector('.counts-slider') as noUiSlider.Instance;
  const yearsSlider = document.querySelector('.years-slider') as noUiSlider.Instance;

  countsSlider.noUiSlider.updateOptions({
    start: [0, 12]
  }, false);
  yearsSlider.noUiSlider.updateOptions({
    start: [1940, 2021]
  }, false);
}


const shapesArray = ['колокольчик', 'шар', 'шишка', 'снежинка', 'фигурка'];
const shapes: NodeListOf<HTMLElement> = main1.querySelectorAll('.shape__button');
addListener(shapes, globalObject.shapesArray, 'shape');


const colorsArray = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
const colors: NodeListOf<HTMLElement> = main1.querySelectorAll('.color__button');
import { rmFromLS, addToLS } from '../../utilites/functions';

addListener(colors, globalObject.colorsArray, 'color');

const sizesArray: string[] = ['большой', 'средний', 'малый'];
const sizeChecks: NodeListOf<HTMLInputElement> = main1.querySelectorAll('.check__input');
for (let i = 0; i < sizeChecks.length; i++) {
  sizeChecks[i].checked = globalObject.size.includes(globalObject.sizesArray[i]);
}
addListener(sizeChecks, globalObject.sizesArray, 'size');


const resetFilterButton = button('reset-button', 'Сбросить фильтры', () => {
  resetFilters();
});
const resetSettingsButton = button('reset-button', 'Сбросить настройки', () => {
  resetSettings();
  if (!String(localStorage.getItem('volume')).includes('mute')) {
    volumeButton.classList.remove('mute_button');
  }
});
const resetButtons = main1.querySelector('.aside__buttons') as HTMLDivElement;
resetButtons.append(resetFilterButton);
resetButtons.append(resetSettingsButton);


import card from './cards/index';

import Cards from './class/class';
import { ICard, ILocalStorage } from '../../utilites/interfaces';


const SortedCards = new Cards();
// if (!localStorage.getItem('data')) {
//
//   localStorage.setItem('data', JSON.stringify(SortedCards.data));
// }

// SortedCards.data = globalObject.data;

function insertCards() {
  // if (!localStorage.getItem('object')) {
  SortedCards.data = new Cards().data;
  // }
  // else {
  // SortedCards.data = JSON.parse(localStorage.getItem('object')).data;
  // SortedCards.data = globalObject.data;
  // }
  globalObject.data = SortedCards.returnResultArray();
  //   SortedCards.data.filter((element:ICard) => {
  //   return Number(element.count) >= Number(objFromLS.counts[0]) &&
  //     Number(element.count) <= Number(objFromLS.counts[1]) &&
  //     Number(element.year) >= Number(objFromLS.years[0]) &&
  //     Number(element.year) <= Number(objFromLS.years[1]) &&
  //     objFromLS.shape.includes(element.shape) &&
  //     objFromLS.color.includes(element.color) &&
  //     objFromLS.size.includes(element.size) &&
  //     objFromLS.favorite.includes(element.favorite) &&
  //     (element.name.toUpperCase().includes(objFromLS.name.toUpperCase()) || objFromLS.name === '');
  // })
  // SortedCards.returnResultArray();
  // console.log(SortedCards.data,globalObject.data, SortedCards.returnResultArray(),'%%');
  switch (true) {
    case objFromLS.sort.includes('year') :
      globalObject.data.sort((a: ICard, b: ICard) => compare(a, b, 'year'));
      break;
    case objFromLS.sort.includes('name'):
      globalObject.data.sort((a: ICard, b: ICard) => compare(a, b, 'name'));
  }
  for (let i = 0; i < globalObject.data.length; i++) {

    const newCard = card('prop', globalObject.data[i], () => {
      let chosen = globalObject['chosen'] ? Number(globalObject.chosen) : 0;
      if (globalObject.data[i].chosen) {
        delete globalObject.data[i].chosen;
        chosen--;
      }
      if (chosen >= 20) {
        alert('>20');
      } else {
        chosen++;
        globalObject.data[i].chosen = 'yes';
      }
      globalObject.chosen = chosen;
      localStorage.setItem('object', JSON.stringify(globalObject));
      cardsContainer.innerHTML = '';
      insertCards();

    });
    if (globalObject.sort.includes('ascending')) {
      cardsContainer.append(newCard);
    } else {
      cardsContainer.prepend(newCard);
    }
  }
  localStorage.setItem('object', JSON.stringify(globalObject));
}

function compare(a: ICard, b: ICard, key: string) {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }
  return 0;
}

// function insertCards() {
//   if (!localStorage.getItem('data')) {
//     SortedCards.data = new Cards().data;
//   }
//   const cardsData = SortedCards.returnResultArray();
//   console.log(cardsData);
//   if (objFromLS.sort.includes('year')) {
//     cardsData.sort((a, b) => {
//       if (a.year > b.year) {
//         return 1;
//       }
//       if (a.year < b.year) {
//         return -1;
//       }
//       return 0;
//     });
//   }
//   if (objFromLS.sort.includes('name')) {
//     cardsData.sort((a, b) => {
//       if (a.name > b.name) {
//         return 1;
//       }
//       if (a.name < b.name) {
//         return -1;
//       }
//       return 0;
//     });
//   }
//
//   for (let i = 0; i < cardsData.length; i++) {
//
//     const newCard = card('prop', cardsData[i], () => {
//       let chosen = localStorage.getItem('chosen') ? Number(localStorage.getItem('chosen')) : 0;
//       // if (cardsData[i].chosen) {
//       //   delete cardsData[i].chosen;
//       //   chosen--;
//       // } else {
//       //   if (chosen >= 20) {
//       //     alert('>20');
//       //   } else {
//       //     chosen++;
//       //     cardsData[i].chosen = 'yes';
//       //   }
//       // }
//       localStorage.setItem('chosen', String(chosen));
//
//
//       // const favorite = newCard.querySelector('.properties').lastElementChild as HTMLElement;
//       // if (favorite.innerText === 'Любимая: да') {
//       //   favorite.innerText = 'Любимая: нет';
//       //   cardsData[i].favorite = 'нет';
//       // } else {
//       //   favorite.innerText = 'Любимая: да';
//       //   cardsData[i].favorite = 'да';
//       // }
//       localStorage.setItem('data', JSON.stringify(SortedCards.data));
//
//       // newCard.classList.toggle('favorite_card');
//       cardsContainer.innerHTML = '';
//       insertCards();
//
//     });
//     if (objFromLS.sort.includes('ascending')) {
//       cardsContainer.append(newCard);
//     } else {
//       cardsContainer.prepend(newCard);
//     }
//   }
// }

function resetFilters() {
  const chosen = localStorage.getItem('chosen');
  const sort = localStorage.getItem('sort');
  localStorage.clear();
  // firstLsSet();
  // localStorage.setItem('sort', sort);
  // localStorage.setItem('chosen', chosen);
  cardsContainer.innerHTML = '';
  insertCards();
  resetButtonsStatus();
}

function resetSettings() {
  localStorage.clear();
  // firstLsSet();
  localStorage.removeItem('volume');
  SortedCards.data = new Cards().data;
  cardsContainer.innerHTML = '';
  insertCards();
  resetButtonsStatus();
  audio.play();
}


function resetButtonsStatus() {
  if (String(localStorage.getItem('volume')).includes('mute')) {
    volumeButton.classList.add('mute_button');
  }
  sortSelect.value = 'По возрастанию';
  // if (localStorage.getItem('sort').split(' ').includes('ascending')) {
  //   sortSelect.value = 'По возрастанию';
  // } else {
  //   sortSelect.value = 'По убыванию';
  // }
  // if (localStorage.getItem('favorite').split(' ').includes('нет')) {
  //   favoriteSelectors[0].checked = true;
  // } else {
  //   favoriteSelectors[1].checked = true;
  // }
  for (let i = 0; i < sizeChecks.length; i++) {
    sizeChecks[i].checked = globalObject.size.includes(globalObject.sizesArray[i]);
  }

  addSelections(shapes, shapesArray, 'shape');
  addSelections(colors, colorsArray, 'color');
  addSelections(sizeChecks, sizesArray, 'size');
  resetSliders();

}

switch (globalObject.sort.join(' ')) {
  case 'ascending':
    sortSelect.value = 'По возрастанию';
    break;
  case 'ascending name':
    sortSelect.value = 'По возрастанию (название)';
    break;
  case 'ascending year':
    sortSelect.value = 'По возрастанию (год)';
    break;
  case 'descending':
    sortSelect.value = 'По убыванию';
    break;
  case 'descending name':
    sortSelect.value = 'По убыванию (название)';
    break;
  case 'descending year':
    sortSelect.value = 'По убыванию (год)';
    break;
}

insertCards();

export { SortedCards, resetSettings };
export default main1;
