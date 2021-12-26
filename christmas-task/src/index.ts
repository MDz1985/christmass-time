import './index.scss';
import mainCover from './components/main-cover/index';


const body: HTMLBodyElement = document.querySelector('.body');

body.prepend(mainCover);

const audio: HTMLAudioElement = document.querySelector('.audio');
audio.volume = 0;
// audio.play().then();
// audio.addEventListener('timeupdate', () => {
//   if (audio.currentTime === audio.duration){
//     audio.currentTime = 0;
//     audio.play().then();
//   }
// })



//test
import main2 from './components/main-2';
mainCover.replaceWith(main2)

