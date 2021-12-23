import './index.scss';
import htmlFromString from '../../../utilites/htmlFromString';

import cardHtml from './index.html';

import { iCard } from '../../../utilites/interfaces';
import setBg from '../../../utilites/image-loader';


const card = (className: string, obj: iCard, func: () => void) => {
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
    'Любимая'
  ];

  function createLi(key: string, number: number, obj: iCard, parent: HTMLElement) {
    const liValue = `${obj[key]}`;

    const liElement = document.createElement('li');
    liElement.className = 'properties__li';
    liElement.innerText = `${toysProperties[number]}: ${liValue}`;
    parent.append(liElement);
    if (liValue === 'да') {
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