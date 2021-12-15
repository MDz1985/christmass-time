import './index.scss'
import htmlFromString from '../../utilites/htmlFromString';

import mainCoverHtml from './index.html';
const mainCover = htmlFromString(mainCoverHtml) as HTMLElement;

function addBall (name: HTMLDivElement, nameClass: string){
  name = document.createElement('div');
  name.className = `${nameClass} ball`;
  mainCover.prepend(name);
}
let ball1, ball2;
addBall( ball2, 'ball_first');
addBall( ball1, 'ball_second');




import button from '../button/index';
import main1 from '../main-1/index';
// const centralDiv = mainCover.querySelector('.central');
mainCover.lastElementChild.append(button('center__button', 'начать', () => {
  mainCover.replaceWith(main1)
}))


export default mainCover;