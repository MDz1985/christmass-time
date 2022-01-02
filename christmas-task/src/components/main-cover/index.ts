import './index.scss';
import htmlFromString from '../../utilites/htmlFromString';

import mainCoverHtml from './index.html';

const mainCover = htmlFromString(mainCoverHtml) as HTMLElement;

function addBall(nameClass: string) {
  const div = document.createElement('div');
  div.className = `${nameClass} ball`;
  mainCover.prepend(div);
}

addBall('ball_first');
addBall('ball_second');

import createButton from '../button/index';
import main1 from '../main-1/index';

const centralDiv = mainCover.querySelector('.center') as HTMLDivElement;
const beginButton = createButton('center__button', 'начать', () => {
  mainCover.replaceWith(main1);
});
centralDiv.append(beginButton);

export default mainCover;
