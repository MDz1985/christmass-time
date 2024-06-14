import htmlFromString from '../../utilites/htmlFromString';
import './index.scss';


import snowHtml from './index.html';


const snow: () => HTMLButtonElement = () => {

  return htmlFromString(snowHtml) as HTMLButtonElement;
};

export default snow;
