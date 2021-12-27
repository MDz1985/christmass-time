import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import main2Html from './index.html';

const main2 = htmlFromString(main2Html) as HTMLElement;

const volumeButton: HTMLButtonElement = main2.querySelector('.volume-button');
if (String(localStorage.getItem('volume')).includes('mute')) {
  volumeButton.classList.add('mute_button');
  // Audio.volume = 0;
}
volumeButton.addEventListener('click', () => {
  volumeButton.classList.toggle('mute_button');
  if (String(localStorage.getItem('volume')).includes('mute')) {
    localStorage.removeItem('volume');
  } else {
    localStorage.setItem('volume', 'mute');
  }
});

import { fallSnow, stopSnow } from '../../utilites/functions';
import button from '../button';

const body = document.querySelector('body');

const snowButton2 = button('snow-button', '', () => {
  snowButton2.classList.toggle('snow_fallen');
  if (String(localStorage.getItem('snowfall')).includes('fall')) {
    localStorage.removeItem('snowfall');
    stopSnow();
  } else {
    localStorage.setItem('snowfall', 'fall');
    fallSnow(body);
  }
});
snowButton2.classList.remove('button');
snowButton2.classList.add('aside_button');

if (String(localStorage.getItem('snowfall')).includes('fall')) {
  snowButton2.classList.add('snow_fallen');
  fallSnow(body);
}

volumeButton.after(snowButton2);


const fir = main2.querySelector('.central__fir') as HTMLDivElement;
const background = main2.querySelector('.central') as HTMLDivElement;
import main2Btn from './button';

const treesDiv = main2.querySelector('.trees');
for (let i = 1; i < 5; i++) {
  treesDiv.appendChild(main2Btn(i, fir, 'tree', 'png'));
}

const backgroundsDiv = main2.querySelector('.background');
for (let i = 1; i < 11; i++) {
  backgroundsDiv.appendChild(main2Btn(i, background, 'bg', 'jpg'));
}

import { SortedCards } from '../main-1';

let toysForFir = SortedCards.filterData().length > 0 ? SortedCards.filterData() : SortedCards.data;
main2.addEventListener('DOMNodeInsertedIntoDocument', () => {
  toysForFir = SortedCards.filterData().length > 0 ? SortedCards.filterData() : SortedCards.data;
  const toysDiv = main2.querySelector('.chosen-toys');
  toysDiv.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    if (toysForFir[i]) {
      toysDiv.appendChild(main2Btn(Number(toysForFir[i].num), background, 'toys', 'png'));
    } else {
      toysDiv.appendChild(main2Btn(null, background, 'toys', 'png'));
    }

  }
});

// console.log(SortedCards.filterData(), SortedCards.data);

import garland from './garland';
console.log(garland);
// fir.appendChild(garland);

export default main2;
