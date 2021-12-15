import htmlFromString from '../../utilites/htmlFromString';
import './index.scss';


import buttonHtml from './index.html'

const button = (className: string, innerText: string, func: () => void) => {
  const element = htmlFromString(buttonHtml) as HTMLButtonElement;
  element.innerText = innerText;
  element.classList.add(className);
  element.addEventListener('click', func);
  return element;
};

export default button;
