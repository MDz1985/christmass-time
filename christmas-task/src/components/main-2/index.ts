import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import main2Html from './index.html';

import { objFromLS } from '../../utilites/consts';

const globalObj = objFromLS;

const main2 = htmlFromString(main2Html) as HTMLElement;
const audio = document.querySelector('.audio') as HTMLAudioElement;

const volumeButton = main2.querySelector('.volume-button') as HTMLButtonElement;
if (globalObj.volume === 'mute') {
  volumeButton.classList.add('button_mute');
}
volumeButton.addEventListener('click', () => {
  volumeButton.classList.toggle('button_mute');
  if (globalObj.volume === 'mute') {
    globalObj.volume = '';
    audio.play();
  } else {
    globalObj.volume = 'mute';
    audio.pause();
  }
  localStorage.setItem('object', JSON.stringify(globalObj));
});

import { fallSnow, stopSnow } from '../../utilites/functions';
import createButton from '../button';


const body = document.querySelector('body') as HTMLBodyElement;

const snowButton = createButton('snow-button', '', () => {
  snowButton.classList.toggle('snow_fallen');
  if (globalObj.snowfall === 'fall') {
    globalObj.snowfall = '';
    stopSnow();
  } else {
    globalObj.snowfall = 'fall';
    fallSnow(body);
  }
  localStorage.setItem('object', JSON.stringify(globalObj));
});
snowButton.classList.remove('button');
snowButton.classList.add('aside_button');

volumeButton.after(snowButton);


main2.addEventListener('DOMNodeInsertedIntoDocument', () => {

  if (globalObj.volume === 'mute') {
    volumeButton.classList.add('button_mute');
  } else volumeButton.classList.remove('button_mute');
  if (globalObj.snowfall.includes('fall')) {
    snowButton.classList.add('snow_fallen');
  } else {
    snowButton.classList.remove('snow_fallen');
  }
  if (globalObj.tree !== '') {
    fir.style.background = `url('${globalObj.tree}') no-repeat`;
    fir.style.backgroundSize = 'cover';
  }
  if (globalObj.bg !== '') {
    background.style.background = `url('${globalObj.bg}') no-repeat`;
    background.style.backgroundSize = 'cover';
  }
  if (globalObj.garland !== '') {
    fir.innerHTML = '';
    fir.appendChild(createGarland(globalObj.garland));
  }
});

const fir = main2.querySelector('.central__fir') as HTMLDivElement;
const background = main2.querySelector('.central') as HTMLDivElement;
import createBtn from './button';

const treesDiv = main2.querySelector('.trees') as HTMLDivElement;
for (let i = 1; i < 5; i++) {
  treesDiv.appendChild(createBtn(fir, 'tree', 'png', i));
}

const backgroundsDiv = main2.querySelector('.background') as HTMLDivElement;
for (let i = 1; i < 11; i++) {
  backgroundsDiv.appendChild(createBtn(background, 'bg', 'jpg', i));
}


import { SortedCards } from '../main-1';

const resetButton2 = createButton('reset-button', 'Сбросить настройки', () => {

  resetMain2();
  audio.play();
  volumeButton.classList.remove('button_mute');
});
const asideButtonsDiv = main2.querySelector('.aside__buttons') as HTMLDivElement;
asideButtonsDiv.appendChild(resetButton2);


let toysForFir = SortedCards.filterData().length > 0 ? SortedCards.filterData() : SortedCards.data;
main2.addEventListener('DOMNodeInsertedIntoDocument', updateToys);


import createGarland from './garland';


const garlandSelectDiv = main2.querySelector('.garland-select') as HTMLDivElement;
const colorArray = ['random', 'red', 'blueviolet', 'yellow', 'blue'];
for (let i = 0; i < 5; i++) {
  const garlandButton = createButton('garland-select__button', '', () => {
    fir.innerHTML = '';
    fir.appendChild(createGarland(colorArray[i]));
    globalObj.garland = colorArray[i];
    localStorage.setItem('object', JSON.stringify(globalObj));
  });
  garlandButton.classList.remove('button');
  if (i > 0) {
    garlandButton.style.background = colorArray[i];
  } else {
    garlandButton.style.background = 'linear-gradient(0deg, red, blueviolet, yellow,blue';
  }
  garlandSelectDiv.appendChild(garlandButton);
}
const cancelButton = createButton('garland-select__cancel-button', 'off', () => {
  fir.innerHTML = '';
});
garlandSelectDiv.appendChild(cancelButton);


function resetMain2(): void {
  localStorage.clear();
  fir.style.background = '';
  fir.innerHTML = '';
  background.style.background = '';
  updateToys();
  snowButton.classList.remove('snow_fallen');
  stopSnow();
}

function updateToys(): void {
  toysForFir = SortedCards.filterData().length > 0 ? SortedCards.filterData() : SortedCards.data;
  const toysDiv = main2.querySelector('.chosen-toys') as HTMLDivElement;
  toysDiv.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    if (toysForFir[i]) {
      const toyButton = createBtn(background, 'toys', 'png', Number(toysForFir[i].num)) as HTMLButtonElement;
      const toyButtonText = toyButton.querySelector('.main-btn__span') as HTMLSpanElement;
      toyButtonText.innerText = toysForFir[i].count;
      toysDiv.appendChild(toyButton);
    } else {
      toysDiv.appendChild(createBtn(background, 'toys', 'png'));
    }

  }
}


export default main2;
