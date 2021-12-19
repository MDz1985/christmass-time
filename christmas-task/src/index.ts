import './index.scss';
import mainCover from './components/main-cover/index';


const body: HTMLBodyElement = document.querySelector('.body');

body.prepend(mainCover);

const audio: HTMLAudioElement = document.querySelector('.audio');
audio.volume = 0.1;
audio.play().then();
audio.addEventListener('timeupdate', () => {
  if (audio.currentTime === audio.duration){
    audio.currentTime = 0;
    audio.play().then();
  }
})


//
// import Cards from './components/main-1/class/class';
//
// const MyCards = new Cards();

//
// localStorage.setItem('sort', 'aschending');
// localStorage.setItem('name', 'Голубой  шар Метель');
// localStorage.setItem('count', '30');
// localStorage.setItem('year', '2021');
// localStorage.setItem('shape', 'шар снежинка фигурка колокольчик шишка');
// localStorage.setItem('color', 'красный синий белый зелёный желтый');
// localStorage.setItem('size', 'большой средний малый');
// localStorage.setItem('favorite', 'да нет');

// console.log(MyCards.returnResultArray());

