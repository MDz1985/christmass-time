import htmlFromString from '../../utilites/htmlFromString';
import './index.scss';


import universalButtonHtml from './index.html';


const button = (className: string, innerText: string, doOnClick: () => void) => {
  const element = htmlFromString(universalButtonHtml) as HTMLButtonElement;
  element.innerText = innerText;
  element.classList.add(className);
  element.addEventListener('click', doOnClick);
  return element;
};

export default button;
