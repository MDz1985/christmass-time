import htmlFromString from '../../../utilites/htmlFromString';
import './index.scss';


import treeHtml from './index.html';

// let dragged: Node | HTMLElement |Event['target']
// document.addEventListener("dragstart", function( event ) {
//   // store a ref. on the dragged elem
//   const target = event.target as HTMLElement
//   dragged = event.target as Event['target'];
//   // make it half transparent
//   target.style.opacity = '.5';
//   console.log(dragged)
// }, false);
//
// document.addEventListener("dragenter", function( event ) {
//   const target = event.target as HTMLElement
//   // highlight potential drop target when the draggable element enters it
//   if ( target.className == "central__fir" ) {
//     target.style.background = "purple";
//
//   }
//
//  }, false);
// document.addEventListener("dragover", function( event ) {
//   // prevent default to allow drop
//   event.preventDefault();
// }, false);
// document.addEventListener("drop", function( event ) {
//   // prevent default action (open as link for some elements)
//
//   const target = event.target as HTMLElement
//   event.preventDefault();
//   // // move dragged elem to the selected drop target
//   if ( target.className === "central__fir" ) {
//     target.style.background = "";
//   //   // dragged.parentNode.removeChild( dragged );
//   //   if ('style' in dragged) {
//   //     dragged.style.position = 'absolute';
//   //   }
//     target.appendChild( dragged as Node );
//   }
//
// }, false);



const main2Btn = (htmlElement: HTMLElement, folder: string, type: string, number?: number,) => {
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
          target.style.opacity = '';
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
        localStorage.setItem(folder, elementImg.src);
      });
    }
  }
  return element;
};

export default main2Btn;
