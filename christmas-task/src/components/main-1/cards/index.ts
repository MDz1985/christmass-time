import './index.scss';
import htmlFromString from '../../../utilites/htmlFromString';

import cardHtml from './index.html';

import { ICard } from '../../../utilites/interfaces';
import setBg from '../../../utilites/image-loader';


const card = (className: string, obj: ICard, func: () => void) => {
  const element = htmlFromString(cardHtml) as HTMLLIElement;
  const cardTitle = element.firstElementChild as HTMLParagraphElement;
  const cardImage = cardTitle.nextElementSibling as HTMLDivElement;
  const cardProperties = element.lastElementChild as HTMLUListElement;

  element.addEventListener('click', func);

  setBg(cardImage, Number(obj.num));
  cardTitle.innerText = `${obj['name']}`;


  const toysProperties: string[] = [
    'Количество',
    'Год покупки',
    'Форма игрушки',
    'Цвет игрушки',
    'Размер игрушки',
    'Любимая',
    'Избранная'
  ];

  function createLi(key: string, number: number, obj: ICard, parent: HTMLElement) {
    const liValue = `${obj[key]}`;

    const liElement = document.createElement('li');
    liElement.className = 'properties__li';
    liElement.innerText = `${toysProperties[number]}: ${liValue}`;
    parent.append(liElement);
    if (liValue === 'yes') {
      element.classList.add('favorite_card');
    }
  }

  const objKeys: string[] = Object.keys(obj);
  for (let i = 2; i < objKeys.length; i++) {
    createLi(objKeys[i], i - 2, obj, cardProperties);
  }

  return element;
};

export default card;