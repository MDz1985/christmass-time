import htmlFromString from '../../../utilites/htmlFromString';
import './index.scss';


import garlandHtml from './index.html';

import { setSize } from '../../../utilites/functions';

import { getRandomOf } from '../../../utilites/functions';

function createGarland(color: string): HTMLDivElement {

  const element = htmlFromString(garlandHtml) as HTMLDivElement;

  for (let i = 1; i < 4; i++) {
    const garlandLine = document.createElement('ul');
    garlandLine.className = 'garland-line';
    setSize(i, garlandLine);
    for (let j = 0; j < 8 * i; j++) {
      const garlandBulb = document.createElement('li');
      garlandBulb.className = `garland-line__bulb ${color}_bulb`;
      setTimeout(() => {
        garlandLine.appendChild(garlandBulb);

      }, getRandomOf(3500));
    }
    element.appendChild(garlandLine);
  }
  return element;
}


export default createGarland;
