import htmlFromString from '../../../utilites/htmlFromString';
import './index.scss';
import {objFromLS} from '../../../utilites/consts';
const globalObj = objFromLS;

import treeHtml from './index.html';


let x = 0;
let y = 0;

function drag(event: DragEvent): void {
  const target = event.target as HTMLImageElement;
  if (event.type === 'dragstart') {
    x = event.clientX;
    y = event.clientY;
  } else if (event.type === 'dragend') {
    target.style.opacity = '';
    console.log(event);
    let thisX = 0;
    let thisY = 0;
    if (target.style.transform) {
      const targetTransformMatch = target.style.transform.match(/(-?[0-9]*)/g) as RegExpMatchArray;
      thisX = Number(targetTransformMatch.filter(value => value !== '')[0]);
      thisY = Number(targetTransformMatch.filter(value => value !== '')[1]);
    }
    target.style.transform = `translate(${thisX - (x - event.clientX) - 34}px, ${thisY - (y - event.clientY) + 34}px)`;

  }

}




const createUniversalButtonForTreeMain = (htmlElement: HTMLElement, folder: string, type: string, number?: number,) => {
  const element = htmlFromString(treeHtml) as HTMLButtonElement;
  element.classList.add(folder);
  if (!number) {
    element.innerHTML = '';
  } else {

    const elementImg = element.firstElementChild as HTMLImageElement;
    elementImg.classList.add(`${folder}__img`);
    const img = new Image();
    img.src = `${globalObj.url}${folder}/${number}.${type}`;
    img.addEventListener('load', () => {
      elementImg.src = `${globalObj.url}${folder}/${number}.${type}`;
    });
    if (folder === 'toys') {



      elementImg.addEventListener('dragstart', drag);
      elementImg.addEventListener('dragend', drag);
    } else {

      element.addEventListener('click', () => {
        htmlElement.style.background = `url('${elementImg.src}') no-repeat`;
        if (type === 'png') {
          htmlElement.style.backgroundSize = 'contain';
        } else {
          htmlElement.style.backgroundSize = 'cover';
        }
        globalObj[folder] = elementImg.src;
        localStorage.setItem('object', JSON.stringify(globalObj));
      });
    }
  }

  return element;
};


export default createUniversalButtonForTreeMain;
