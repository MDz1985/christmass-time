import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import main2Html from './index.html';

const main2 = htmlFromString(main2Html) as HTMLElement;

const fir = main2.querySelector('.central__fir') as HTMLDivElement;
const background = main2.querySelector('.central') as HTMLDivElement;
import main2Btn from './button'

const treesDiv = main2.querySelector('.trees');
for (let i = 1; i < 5; i++) {
  treesDiv.appendChild(main2Btn(i, fir, 'tree', 'png'));
}

const backgroundsDiv = main2.querySelector('.background');
for (let i = 1; i < 11; i++) {
  backgroundsDiv.appendChild(main2Btn(i, background, 'bg', 'jpg'));
}

import {SortedCards} from '../main-1';

const toysForFir = SortedCards.filterData().length > 0 ? SortedCards.filterData() : SortedCards.data

const toysDiv = main2.querySelector('.chosen-toys');
for (let i = 0; i < 20; i++) {
  if(toysForFir[i]){
    toysDiv.appendChild(main2Btn(Number(toysForFir[i].num), background, 'toys', 'png'));
  } else {
    toysDiv.appendChild(main2Btn(null, background, 'toys', 'png'));
  }

}
// console.log(SortedCards.filterData(), SortedCards.data);




export default main2;
