import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import main1Html from './index.html';

const main1 = htmlFromString(main1Html) as HTMLElement;
const cardsContainer = main1.querySelector('.cards-container');

import button from '../button/index';
import setBg from '../../utilites/image-loader';

let toyButton;
const toyArray = ['Колокол', 'Шар', 'Шишка', 'Звезда', 'Снежинка', 'Фигурка'];
for (let i = 0; i < 6; i++) {
  toyButton = button('toy-button', toyArray[i], () => console.log(7));
}

function addListener(element: NodeListOf<HTMLElement>, array: string[], key: string): void {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener('click', () => {
      if (SortedCards.getValFromLS(key).includes(array[i])) {
        rmFromLS(key, array[i]);
      } else {
        addToLS(key, array[i]);
      }
      cardsContainer.innerHTML = '';
      insertCards();
      addToLS(key, 'control');
    });
  }
}

const searchArea: HTMLInputElement = main1.querySelector('.search-form__input');
searchArea.addEventListener('change', () => {
  localStorage.setItem('name', searchArea.value);
  console.log(searchArea.value);
  cardsContainer.innerHTML = '';
  insertCards();
});
searchArea.addEventListener('mouseleave', () => {
  localStorage.setItem('name', searchArea.value);
  console.log(searchArea.value);
  cardsContainer.innerHTML = '';
  insertCards();
});

const sortSelect: HTMLSelectElement = main1.querySelector('.sort__select');
if (localStorage.getItem('sort').split(' ').includes('ascending')) {
  sortSelect.value = 'По возрастанию';
} else {
  sortSelect.value = 'По убыванию';
}
sortSelect.addEventListener('change', () => {
  if (sortSelect.value !== 'По возрастанию') {
    rmFromLS('sort', 'ascending');
    addToLS('sort', 'descending');
  } else {
    addToLS('sort', 'ascending');
  }
  cardsContainer.innerHTML = '';
  insertCards();
});


// const radioArray = ['да', 'нет'];
const favoriteSelectors: NodeListOf<HTMLInputElement> = main1.querySelectorAll('.radio__input');

if (localStorage.getItem('favorite').split(' ').includes('да')) {
  favoriteSelectors[0].checked = true;
} else {
  favoriteSelectors[1].checked = true;
}
favoriteSelectors[0].addEventListener('change', () => {
  addToLS('favorite', 'да');
  cardsContainer.innerHTML = '';
  insertCards();
});
favoriteSelectors[1].addEventListener('change', () => {
  rmFromLS('favorite', 'да');
  cardsContainer.innerHTML = '';
  insertCards();
});

const ranges: NodeListOf<HTMLInputElement> = main1.querySelectorAll('.label_input');
ranges[0].addEventListener('change', () => {
  localStorage.setItem('count', ranges[0].value);
  cardsContainer.innerHTML = '';
  insertCards();
});
ranges[1].addEventListener('change', () => {
  localStorage.setItem('year', ranges[1].value);
  cardsContainer.innerHTML = '';
  insertCards();
});

const shapesArray = ['колокольчик', 'шар', 'шишка', 'снежинка', 'фигурка'];
const shapes: NodeListOf<HTMLElement> = main1.querySelectorAll('.shape__button');
addListener(shapes, shapesArray, 'shape');


const colorsArray = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
const colors: NodeListOf<HTMLElement> = main1.querySelectorAll('.color__button');
import { rmFromLS, addToLS } from '../../utilites/functions';

addListener(colors, colorsArray, 'color');

const sizesArray: string[] = ['большой', 'средний', 'малый'];
const sizeChecks: NodeListOf<HTMLInputElement> = main1.querySelectorAll('.check__input');
for (let i = 0; i < sizeChecks.length; i++) {
  sizeChecks[i].checked = localStorage.getItem('size').includes(sizesArray[i]);
}
addListener(sizeChecks, sizesArray, 'size');


import { firstLsSet } from '../../utilites/functions';

const resetFilterButton = button('reset-button', 'Сбросить фильтры', () => {
  refactor();
});
const resetSettingsButton = button('reset-button', 'Сбросить настройки', () => {
  refactor();
});
const resetButtons = main1.querySelector('.aside__buttons');
resetButtons.append(resetFilterButton);
resetButtons.append(resetSettingsButton);


import data from '../../data';

import card from './cards/index';

import Cards from './class/class';

const SortedCards = new Cards();


function insertCards() {
  const cardsData = SortedCards.returnResultArray();
  for (let i = 0; i < cardsData.length; i++) {
    const newCard = card('prop', cardsData[i]);
    if (localStorage.getItem('sort').split(' ').includes('ascending')) {
      cardsContainer.append(newCard);
    } else {
      cardsContainer.prepend(newCard);
    }
  }
}

function refactor() {
  localStorage.clear();
  firstLsSet();
  cardsContainer.innerHTML = '';
  insertCards();
}

insertCards();

export default main1;