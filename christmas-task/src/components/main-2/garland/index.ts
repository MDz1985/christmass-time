import htmlFromString from '../../../utilites/htmlFromString';
import './index.scss';


import garlandHtml from './index.html';

const garland = htmlFromString(garlandHtml) as HTMLDivElement;

import { setSize } from '../../../utilites/functions';
import {getRandom} from '../../../utilites/functions';

for (let i = 1; i < 4; i++) {
  const garlandLine = document.createElement('ul');
  garlandLine.className = 'garland-line';
  setSize(i, garlandLine);
  for (let j = 0; j < 8 * i; j++) {
    const garlandBulb = document.createElement('li');
    garlandBulb.className = 'garland-line__bulb';
    setTimeout(() => {
      garlandLine.appendChild(garlandBulb);

    }, getRandom());
  }
  garland.appendChild(garlandLine);
}


export default garland;
