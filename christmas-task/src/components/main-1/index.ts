import './index.scss'
import htmlFromString from '../../utilites/htmlFromString';

import main1Html from './index.html';
const main1 = htmlFromString(main1Html) as HTMLElement;
const cardsContainer = main1.querySelector('.cards-container');

import button from '../button/index';
import setBg from '../../utilites/image-loader';

let toyButton;
let toyArray = ['Колокол', 'Шар', 'Шишка', 'Звезда', 'Снежинка', 'Фигурка'];
for (let i = 0; i < 6; i++){
  toyButton = button('toy-button', toyArray[i], () => console.log(7));

}


const resetFilterButton = button('reset-button', 'Сбросить фильтры', () => console.log('resetFilter'));
const resetSettingsButton = button('reset-button', 'Сбросить настройки', () => console.log('resetSettings'));
const resetButtons = main1.querySelector('.aside__buttons');
resetButtons.append(resetFilterButton);
resetButtons.append(resetSettingsButton);


import data from '../../data';
import card from './cards/index';

for (let i = 0; i < data.length; i++){
  const newCard = card('prop', data[i])
  cardsContainer.append(newCard);
}


export default main1;