import './index.scss';
import htmlFromString from '../../../utilites/htmlFromString';

import cardHtml from './index.html';

import { iCard } from '../../../utilites/interfaces';
import { iiCard } from '../../../utilites/interfaces';
import setBg from '../../../utilites/image-loader';


const card = (className: string, obj: iCard) => {
  const element = htmlFromString(cardHtml) as HTMLLIElement;
  const cardTitle = element.firstElementChild as HTMLParagraphElement;
  const cardImage = cardTitle.nextElementSibling as HTMLDivElement;
  const cardProperties = element.lastElementChild as HTMLUListElement;

  // import image from '../../../assets'

  setBg(cardImage, Number(obj.num));
  cardTitle.innerText = `${obj['name']}`;


  const toysProperties: string[] = [
    'Количество',
    'Год покупки',
    'Форма игрушки',
    'Цвет игрушки',
    'Размер игрушки',
    'Любимая'
  ];

  function createLi(key: string, number: number, obj: iCard, parent: HTMLElement) {
    let liValue: string;
    // if (key !== 'favorite') {
      liValue = `${obj[key]}`;
    // } else {
    //   liValue = obj[key] === true ? 'да' : 'нет';
    // }
    const element = document.createElement('li');
    element.className = 'properties__li';
    element.innerText = `${toysProperties[number]}: ${liValue}`;
    // const prop = document.querySelector('.properties');
    parent.append(element);
  }

  const objKeys: string[] = Object.keys(obj);
  for (let i = 2; i < objKeys.length; i++) {
    createLi(objKeys[i], i - 2, obj, cardProperties);

  }


  class Card {

  }

  return element;
};

export default card;