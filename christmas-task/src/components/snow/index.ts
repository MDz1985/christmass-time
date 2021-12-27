import htmlFromString from '../../utilites/htmlFromString';
import './index.scss';


import snowHtml from './index.html';

// const snow = htmlFromString(snowHtml) as HTMLButtonElement;
const snow = () => {

  return htmlFromString(snowHtml) as HTMLButtonElement;
};

export default snow;
