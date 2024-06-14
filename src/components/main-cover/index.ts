import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import mainCoverHtml from './index.html';

const mainCover = htmlFromString(mainCoverHtml) as HTMLElement;

function addBall(nameOfClass: string): void {
  const ballDivElement = document.createElement('div');
  ballDivElement.className = `${nameOfClass} ball`;
  mainCover.prepend(ballDivElement);
}

addBall('ball_first');
addBall('ball_second');

import createButton from '../button/index';
import toysMainHtmlElement from '../main-1/index';

const centralDiv = mainCover.querySelector('.center') as HTMLDivElement;
const beginButton = createButton('center__button', 'начать', () => {
  mainCover.replaceWith(toysMainHtmlElement);
});
centralDiv.append(beginButton);

export default mainCover;
