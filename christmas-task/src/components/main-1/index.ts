import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import toysMainHtml from './index.html';
import { objFromLS } from '../../utilites/consts';
import createButton from '../button/index';
import { fallSnow, stopSnow } from '../../utilites/functions';
import createCard from './cards/index';

import Cards from './class/class';
import { ICard, ILocalStorage, IStringArraysFromLS } from '../../utilites/interfaces';

import createSlider from './slider';

import { arrayOfCards } from './cards';


const toysMainHtmlElement = htmlFromString(toysMainHtml) as HTMLElement;
const cardsContainer = toysMainHtmlElement.querySelector('.cards-container') as HTMLDivElement;
// arrayOfCards.forEach((value) => cardsContainer.append(value));

const leftMenuHtmlElement: HTMLElement | null = toysMainHtmlElement.querySelector('.aside') as HTMLElement;
const menuButton = toysMainHtmlElement.querySelector('.menu-button') as HTMLButtonElement;
const closeButton = toysMainHtmlElement.querySelector('.close-button') as HTMLButtonElement;
menuButton.addEventListener('click', () => {
  leftMenuHtmlElement.style.display = 'flex';
});
closeButton.addEventListener('click', () => {
  leftMenuHtmlElement.style.display = 'none';
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1150) {
    leftMenuHtmlElement.style.display = 'flex';
  }
});


const globalObject: ILocalStorage = objFromLS;

const volumeButton = toysMainHtmlElement.querySelector('.volume-button') as HTMLButtonElement;
const audio = document.querySelector('.audio') as HTMLAudioElement;
if (globalObject.volume.includes('mute')) {
  volumeButton.classList.add('button_mute');
}
volumeButton.addEventListener('click', () => {
  volumeButton.classList.toggle('button_mute');
  if (globalObject.volume.includes('mute')) {
    globalObject.volume = '';
    audio.play();
  } else {
    globalObject.volume = 'mute';
    audio.pause();
  }
  localStorage.setItem('object', JSON.stringify(globalObject));
});


const body = document.querySelector('body') as HTMLBodyElement;

const snowButton = createButton('snow-button', '', () => {
  snowButton.classList.toggle('snow_fallen');
  if (globalObject.snowfall.includes('fall')) {
    globalObject.snowfall = '';
    stopSnow();
  } else {
    globalObject.snowfall = 'fall';
    fallSnow(body);
  }
  localStorage.setItem('object', JSON.stringify(globalObject));
});
snowButton.classList.remove('button');
snowButton.classList.add('aside_button');

function updVolSnowBtnStatus() {
  if (globalObject.volume === 'mute') {
    volumeButton.classList.add('button_mute');
  } else volumeButton.classList.remove('button_mute');
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


function addListener(element: NodeListOf<HTMLElement>,
                     array: string[], key: keyof IStringArraysFromLS): void {

  for (let i = 0; i < element.length; i++) {
    if (globalObject[key].includes(array[i])) {
      element[i].classList.add('selected_items');
    } else {
      element[i].classList.remove('selected_items');
    }
    element[i].addEventListener('click', () => {
      if (globalObject[key].includes(array[i])) {
        globalObject[key] = globalObject[key].filter((r: string) => r !== array[i]) as string[];
      } else {
        globalObject[key].push(array[i]);
      }
      localStorage.setItem('object', JSON.stringify(globalObject));
      element[i].classList.toggle('selected_items');
      cardsContainer.innerHTML = '';
      insertCards();

    });
  }
}

function addSelections(element: NodeListOf<HTMLElement>, array: string[], key: keyof IStringArraysFromLS): void {
  for (let i = 0; i < array.length; i++) {
    if (globalObject[key].includes(array[i])) {
      element[i].classList.add('selected_items');
    } else {
      element[i].classList.remove('selected_items');
    }
  }
}

const searchArea = toysMainHtmlElement.querySelector('.search-form__input') as HTMLInputElement;
searchArea.addEventListener('change', () => {
  globalObject.name = searchArea.value;
  localStorage.setItem('object', JSON.stringify(globalObject));
  cardsContainer.innerHTML = '';
  insertCards();
});
searchArea.addEventListener('mouseleave', () => {
  globalObject.name = searchArea.value;
  localStorage.setItem('object', JSON.stringify(globalObject));
  cardsContainer.innerHTML = '';
  insertCards();
});

const sortSelect = toysMainHtmlElement.querySelector('.sort__select') as HTMLSelectElement;

sortSelect.addEventListener('change', () => {
  switch (sortSelect.value) {
    case globalObject.sortSelectValuesArray[0]:
      globalObject.sort = ['ascending'];
      break;
    case globalObject.sortSelectValuesArray[1]:
      globalObject.sort = ['descending'];
      break;
    case globalObject.sortSelectValuesArray[2]:
      globalObject.sort = ['ascending', 'year'];
      break;
    case globalObject.sortSelectValuesArray[3]:
      globalObject.sort = ['descending', 'year'];
      break;
    case globalObject.sortSelectValuesArray[4]:
      globalObject.sort = ['ascending', 'name'];
      break;
    case globalObject.sortSelectValuesArray[5]:
      globalObject.sort = ['descending', 'name'];
      break;
  }
  localStorage.setItem('object', JSON.stringify(globalObject));


  cardsContainer.innerHTML = '';
  insertCards();
});


const favoriteSelectors: NodeListOf<HTMLInputElement> = toysMainHtmlElement.querySelectorAll('.radio__input');

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


toysMainHtmlElement.addEventListener('DOMNodeInsertedIntoDocument', function insertScroll() {

    const categoriesTitles = toysMainHtmlElement.querySelectorAll('.categories__title') as NodeListOf<HTMLElement>;
    const countsSlider = createSlider(globalObject.countsSlider.className, globalObject.countsSlider.key, globalObject.countsSlider.min, globalObject.countsSlider.max, () => {
      cardsContainer.innerHTML = '';
      insertCards();
    }) as noUiSlider.Instance;
    const yearsSlider = createSlider(globalObject.yearsSlider.className, globalObject.yearsSlider.key, globalObject.yearsSlider.min, globalObject.yearsSlider.max, () => {
      cardsContainer.innerHTML = '';
      insertCards();
    });
    categoriesTitles[1].after(countsSlider);
    categoriesTitles[2].after(yearsSlider);

    toysMainHtmlElement.removeEventListener('DOMNodeInsertedIntoDocument', insertScroll);

  }
);

toysMainHtmlElement.addEventListener('DOMNodeInsertedIntoDocument', function updateLS() {
  if (!localStorage.getItem('object')) {
    localStorage.setItem('object', JSON.stringify(globalObject));
  }
  updVolSnowBtnStatus();
});


function resetSliders() {
  const countsSlider = document.querySelector('.counts-slider') as noUiSlider.Instance;
  const yearsSlider = document.querySelector('.years-slider') as noUiSlider.Instance;

  countsSlider.noUiSlider.updateOptions({
    start: [globalObject.countsSlider.min, globalObject.countsSlider.max]
  }, false);
  yearsSlider.noUiSlider.updateOptions({
    start: [globalObject.yearsSlider.min, globalObject.yearsSlider.max]
  }, false);
}


const shapesArray = ['колокольчик', 'шар', 'шишка', 'снежинка', 'фигурка'];
const shapes: NodeListOf<HTMLElement> = toysMainHtmlElement.querySelectorAll('.shape__button');
addListener(shapes, globalObject.shapesArray, 'shape');


const colorsArray = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
const colors: NodeListOf<HTMLElement> = toysMainHtmlElement.querySelectorAll('.color__button');

addListener(colors, globalObject.colorsArray, 'color');

const sizesArray: string[] = ['большой', 'средний', 'малый'];
const sizeChecks: NodeListOf<HTMLInputElement> = toysMainHtmlElement.querySelectorAll('.check__input');
for (let i = 0; i < sizeChecks.length; i++) {
  sizeChecks[i].checked = globalObject.size.includes(globalObject.sizesArray[i]);
}
addListener(sizeChecks, globalObject.sizesArray, 'size');


const resetFilterButton = createButton('reset-button', 'Сбросить фильтры', () => {
  resetFilters();
});
const resetSettingsButton = createButton('reset-button', 'Сбросить настройки', () => {
  resetSettings();
  if (!String(localStorage.getItem('volume')).includes('mute')) {
    volumeButton.classList.remove('button_mute');
  }
});
const resetButtons = toysMainHtmlElement.querySelector('.aside__buttons') as HTMLDivElement;
resetButtons.append(resetFilterButton);
resetButtons.append(resetSettingsButton);


const SortedCards = new Cards();

function insertCards(): void {

  SortedCards.data = new Cards().data;

  globalObject.data = SortedCards.returnResultArray();

  switch (true) {
    case objFromLS.sort.includes('year') :
      globalObject.data.sort((a: ICard, b: ICard) => compare(a, b, 'year'));
      break;
    case objFromLS.sort.includes('name'):
      globalObject.data.sort((a: ICard, b: ICard) => compare(a, b, 'name'));
  }
  for (let i = 0; i < globalObject.data.length; i++) {

    const newCard = createCard('prop', globalObject.data[i], () => {
      let chosenCardsCount = globalObject.chosen;
      const maxCardsCount = 20;
      if (globalObject.data[i].chosen) {
        delete globalObject.data[i].chosen;
        chosenCardsCount--;
      }
      if (chosenCardsCount >= maxCardsCount) {
        alert('>20');
      } else {
        chosenCardsCount++;
        globalObject.data[i].chosen = 'yes';
      }
      globalObject.chosen = chosenCardsCount;
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

function compare(a: ICard, b: ICard, key: string): 1 | 0 | -1 {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }
  return 0;
}


function resetFilters(): void {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  insertCards();
  resetButtonsStatus();
}

function resetSettings(): void {
  localStorage.clear();
  SortedCards.data = new Cards().data;
  cardsContainer.innerHTML = '';
  insertCards();
  resetButtonsStatus();
  audio.play();
}


function resetButtonsStatus(): void {
  if (String(localStorage.getItem('volume')).includes('mute')) {
    volumeButton.classList.add('button_mute');
  }
  sortSelect.value = globalObject.sortSelectValuesArray[0];

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
export default toysMainHtmlElement;
