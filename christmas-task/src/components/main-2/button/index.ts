import htmlFromString from '../../../utilites/htmlFromString';
import './index.scss';


import treeHtml from './index.html';

const main2Btn = (number: number, htmlElement: HTMLElement, folder: string, type: string) => {
  const element = htmlFromString(treeHtml) as HTMLButtonElement;
  element.classList.add(folder);
  if (!number) {
    element.innerHTML = '';
  } else {

    const elementImg = element.firstElementChild as HTMLImageElement;
    elementImg.classList.add(`${folder}__img`);
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/${folder}/${number}.${type}`;
    img.addEventListener('load', () => {
      elementImg.src = `https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/${folder}/${number}.${type}`;
    });
    if (folder === 'toys') {
      let x = 0;
      let y = 0;

      function drag(event: DragEvent) {
        const target = event.target as HTMLImageElement;
        if (event.type === 'dragstart') {
          x = event.clientX;
          y = event.clientY;
        } else if (event.type === 'dragend') {

          console.log(event);
          let thisX = 0;
          let thisY = 0;
          if (target.style.transform) {
            thisX = Number(target.style.transform.match(/(-?[0-9]*)/g).filter(value => value !== '')[0]);
            thisY = Number(target.style.transform.match(/(-?[0-9]*)/g).filter(value => value !== '')[1]);
          }
          target.style.transform = `translate(${thisX - (x - event.clientX) - 34}px, ${thisY - (y - event.clientY) + 34}px)`;

        }

      }

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
      });
    }
  }
  return element;
};

export default main2Btn;
