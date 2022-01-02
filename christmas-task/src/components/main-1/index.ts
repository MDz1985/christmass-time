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
// import setBg from '../../utilites/image-loader';

// let toyButton;
// const toyArray = ['Колокол', 'Шар', 'Шишка', 'Звезда', 'Снежинка', 'Фигурка'];
// for (let i = 0; i < 6; i++) {
//   toyButton = button('toy-button', toyArray[i], () => console.log(7));
// }

// const audio: HTMLAudioElement = document.querySelector('.audio')
const volumeButton = main1.querySelector('.volume-button') as HTMLButtonElement;
const audio = document.querySelector('.audio') as HTMLAudioElement;
if (String(localStorage.getItem('volume')).includes('mute')) {
  volumeButton.classList.add('mute_button');
  // audio.volume = 0;
}
volumeButton.addEventListener('click', () => {
  volumeButton.classList.toggle('mute_button');
  if (String(localStorage.getItem('volume')).includes('mute')) {
    localStorage.removeItem('volume');
    audio.play();
  } else {
    localStorage.setItem('volume', 'mute');
    audio.pause();
  }
});


import { fallSnow, stopSnow } from '../../utilites/functions';

const body = document.querySelector('body') as HTMLBodyElement;

const snowButton = button('snow-button', '', () => {
  snowButton.classList.toggle('snow_fallen');
  if (String(localStorage.getItem('snowfall')).includes('fall')) {
    localStorage.removeItem('snowfall');
    stopSnow();
  } else {
    localStorage.setItem('snowfall', 'fall');
    fallSnow(body);
  }
});
snowButton.classList.remove('button');
snowButton.classList.add('aside_button');

main1.addEventListener('DOMNodeInsertedIntoDocument', () => {
  if (String(localStorage.getItem('volume')).includes('mute')) {
    volumeButton.classList.add('mute_button');
  } else volumeButton.classList.remove('mute_button');
  if (String(localStorage.getItem('snowfall')).includes('fall')) {
    snowButton.classList.add('snow_fallen');
  } else {
    snowButton.classList.remove('snow_fallen');
  }
});


if (String(localStorage.getItem('snow')).includes('fall')) {
  snowButton.classList.add('snow_fallen');
  fallSnow(body);
}

volumeButton.after(snowButton);


function addListener(element: NodeListOf<HTMLElement>, array: string[], key: string): void {
  for (let i = 0; i < element.length; i++) {
    if (localStorage.getItem(key).split(' ').includes(array[i])) {
      element[i].classList.add('selected_items');
    } else {
      element[i].classList.remove('selected_items');
    }
    element[i].addEventListener('click', () => {
      if (SortedCards.getValFromLS(key).includes(array[i])) {
        rmFromLS(key, array[i]);
      } else {
        addToLS(key, array[i]);
      }
      element[i].classList.toggle('selected_items');
      cardsContainer.innerHTML = '';
      insertCards();
      addToLS(key, 'control');
    });
  }
}

function addSelections(element: NodeListOf<HTMLElement>, array: string[], key: string): void {
  for (let i = 0; i < array.length; i++) {
    if (localStorage.getItem(key).split(' ').includes(array[i])) {
      element[i].classList.add('selected_items');
    } else {
      element[i].classList.remove('selected_items');
    }
  }
}

const searchArea = main1.querySelector('.search-form__input') as HTMLInputElement;
searchArea.addEventListener('change', () => {
  localStorage.setItem('name', searchArea.value);
  cardsContainer.innerHTML = '';
  insertCards();
});
searchArea.addEventListener('mouseleave', () => {
  localStorage.setItem('name', searchArea.value);
  cardsContainer.innerHTML = '';
  insertCards();
});

const sortSelect = main1.querySelector('.sort__select') as HTMLSelectElement;
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

  switch (sortSelect.value) {
    case 'По возрастанию':
      addToLS('sort', 'ascending');
      break;
    case 'По убыванию':
      rmFromLS('sort', 'ascending');
      addToLS('sort', 'descending');
      break;
    case 'По возрастанию (год)':
      rmFromLS('sort', 'name');
      addToLS('sort', 'ascending');
      addToLS('sort', 'year');
      break;
    case 'По убыванию (год)':
      rmFromLS('sort', 'name');
      rmFromLS('sort', 'ascending');
      addToLS('sort', 'year');
      break;
    case 'По возрастанию (название)':
      rmFromLS('sort', 'year');
      addToLS('sort', 'ascending');
      addToLS('sort', 'name');
      break;
    case 'По убыванию (название)':
      rmFromLS('sort', 'year');
      rmFromLS('sort', 'ascending');
      addToLS('sort', 'name');
      break;
  }


  cardsContainer.innerHTML = '';
  insertCards();
});


// const radioArray = ['да', 'нет'];
const favoriteSelectors: NodeListOf<HTMLInputElement> = main1.querySelectorAll('.radio__input');

if (localStorage.getItem('favorite').split(' ').includes('нет')) {
  favoriteSelectors[0].checked = true;
} else {
  favoriteSelectors[1].checked = true;
}
favoriteSelectors[0].addEventListener('change', () => {
  addToLS('favorite', 'нет');
  cardsContainer.innerHTML = '';
  insertCards();
});
favoriteSelectors[1].addEventListener('change', () => {
  rmFromLS('favorite', 'нет');
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
  if (!localStorage.getItem('years')) {
    firstLsSet();
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




const SortedCards = new Cards();
if (!localStorage.getItem('data')) {

  localStorage.setItem('data', JSON.stringify(SortedCards.data));
}

SortedCards.data = JSON.parse(localStorage.getItem('data'));

function insertCards() {
  if (!localStorage.getItem('data')) {
    SortedCards.data = new Cards().data;
  }
  const cardsData = SortedCards.returnResultArray();
  if (localStorage.getItem('sort').split(' ').includes('year')) {
    cardsData.sort((a, b) => {
      if (a.year > b.year) {
        return 1;
      }
      if (a.year < b.year) {
        return -1;
      }
      return 0;
    });
  }
  if (localStorage.getItem('sort').split(' ').includes('name')) {
    cardsData.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  for (let i = 0; i < cardsData.length; i++) {

    const newCard = card('prop', cardsData[i], () => {
      let chosen = localStorage.getItem('chosen') ? Number(localStorage.getItem('chosen')) : 0;
      if (cardsData[i].chosen) {
        delete cardsData[i].chosen;
        chosen--;
      } else {
        if (chosen >= 20) {
          alert('>20');
        } else {
          chosen++;
          cardsData[i].chosen = 'yes';
        }
      }
      localStorage.setItem('chosen', String(chosen));


      // const favorite = newCard.querySelector('.properties').lastElementChild as HTMLElement;
      // if (favorite.innerText === 'Любимая: да') {
      //   favorite.innerText = 'Любимая: нет';
      //   cardsData[i].favorite = 'нет';
      // } else {
      //   favorite.innerText = 'Любимая: да';
      //   cardsData[i].favorite = 'да';
      // }
      localStorage.setItem('data', JSON.stringify(SortedCards.data));

      // newCard.classList.toggle('favorite_card');
      cardsContainer.innerHTML = '';
      insertCards();

    });
    if (localStorage.getItem('sort').split(' ').includes('ascending')) {
      cardsContainer.append(newCard);
    } else {
      cardsContainer.prepend(newCard);
    }
  }
}

function resetFilters() {
  const chosen = localStorage.getItem('chosen');
  const sort = localStorage.getItem('sort');
  localStorage.clear();
  firstLsSet();
  localStorage.setItem('sort', sort);
  localStorage.setItem('chosen', chosen);
  cardsContainer.innerHTML = '';
  insertCards();
  resetButtonsStatus();
}

function resetSettings() {
  localStorage.clear();
  firstLsSet();
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
  if (localStorage.getItem('sort').split(' ').includes('ascending')) {
    sortSelect.value = 'По возрастанию';
  } else {
    sortSelect.value = 'По убыванию';
  }
  if (localStorage.getItem('favorite').split(' ').includes('нет')) {
    favoriteSelectors[0].checked = true;
  } else {
    favoriteSelectors[1].checked = true;
  }
  for (let i = 0; i < sizeChecks.length; i++) {
    sizeChecks[i].checked = localStorage.getItem('size').includes(sizesArray[i]);
  }

  addSelections(shapes, shapesArray, 'shape');
  addSelections(colors, colorsArray, 'color');
  addSelections(sizeChecks, sizesArray, 'size');
  resetSliders();

}

insertCards();

export { SortedCards, resetSettings };
export default main1;
