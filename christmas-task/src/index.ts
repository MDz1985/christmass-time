import './index.scss';
import mainCover from './components/main-cover/index';
import main1 from './components/main-1';
import button from './components/button';

const header: HTMLBodyElement = document.querySelector('.header');
const headerButtonText: string[] = ['', 'игрушки', 'ёлка'];

const mainsArray = [mainCover,main1,main2];
for (let i = 0; i < headerButtonText.length; i++) {
  header.append(button('header__button', headerButtonText[i], () => {
    console.log(headerButtonText[i]);
    header.nextElementSibling.replaceWith(mainsArray[i]);
  }));
}
header.firstElementChild.classList.add('tree_button');


header.after(mainCover);


// const audio = new Audio('./assets/audio/audio.mp3');
// header.appendChild(audio);

const audio: HTMLAudioElement = document.querySelector('.audio');

audio.volume = 0.1;
// audio.play();
// audio.addEventListener('timeupdate', () => {
//   if (audio.currentTime === audio.duration){
//     audio.currentTime = 0;
//     audio.play().then();
//   }
// })


//test
import main2 from './components/main-2';

mainCover.replaceWith(main2);
import snow from './components/snow';
import {fallSnow} from './utilites/functions';



// fallSnow(main2)


