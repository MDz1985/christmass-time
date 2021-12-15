import './index.scss'
import mainCover from './components/main-cover/index';

const body:HTMLBodyElement = document.querySelector('.body');

body.prepend(mainCover);

