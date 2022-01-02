import './index.scss';
import mainCover from './components/main-cover/index';
import main1 from './components/main-1';
import main2 from './components/main-2';
import button from './components/button';

const header: HTMLBodyElement = document.querySelector('.header');
const headerButtonText: string[] = ['', 'игрушки', 'ёлка'];

const mainsArray = [mainCover, main1, main2];
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

const audio: HTMLAudioElement | null = document.querySelector('.audio') as HTMLAudioElement;
audio.volume = 0.1;
document.addEventListener('click', function playMusic() {
  if (!String(localStorage.getItem('volume')).includes('mute')) {
    audio.play();
  }
  document.removeEventListener('click', playMusic);
});



