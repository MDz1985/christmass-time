import './index.scss';
import htmlFromString from '../../../utilites/htmlFromString';

import cardHtml from './index.html';

import { ICard } from '../../../utilites/interfaces';
import setBg from '../../../utilites/image-loader';
import { objFromLS, localStorageObject } from '../../../utilites/consts';


export const arrayOfCards: HTMLElement[] = objFromLS.data.map((value: ICard, index: any) => {
  const card = htmlFromString(cardHtml) as HTMLLIElement;
  const cardTitle = card.querySelector('.card__title') as HTMLParagraphElement;
  const cardImage = card.querySelector('.card__image') as HTMLDivElement;
  const cardProperties = card.querySelector('.properties') as HTMLUListElement;

  cardTitle.innerText = `${value.name}`;
  setBg(cardImage, Number(value.num));
  const arrayOfPropertiesNames = Object.keys(value).slice(2);
  const propertiesArray = arrayOfPropertiesNames.map((val: keyof ICard, ind) => {
    const liElement: HTMLLIElement = document.createElement('li', index);
    liElement.className = 'properties__li';
    liElement.innerText = `${objFromLS.toysProperties[ind]}: ${value[val]}`;
    return liElement;
  });
  propertiesArray.forEach((element) => {
    cardProperties.append(element);
  });
  return card;
});


const card = (className: string, obj: ICard, func: () => void) => {
  const element = htmlFromString(cardHtml) as HTMLLIElement;
  const cardTitle = element.firstElementChild as HTMLParagraphElement;
  const cardImage = cardTitle.nextElementSibling as HTMLDivElement;
  const cardProperties = element.lastElementChild as HTMLUListElement;

  element.addEventListener('click', func);

  setBg(cardImage, Number(obj.num));
  cardTitle.innerText = `${obj['name']}`;


  function createLi(key: string, number: number, obj: ICard, parent: HTMLElement): void {
    const liValue = `${obj[key]}`;

    const liElement = document.createElement('li');
    liElement.className = 'properties__li';
    liElement.innerText = `${localStorageObject.toysProperties[number]}: ${liValue}`;
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
