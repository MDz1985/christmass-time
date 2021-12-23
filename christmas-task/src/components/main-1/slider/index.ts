import noUiSlider from 'nouislider';
import './index.scss';
import sliderHtml from './index.html';
import htmlFromString from '../../../utilites/htmlFromString';



export default function(key: string, min: number, max: number, func: () => void) {
  const sliderBox = htmlFromString(sliderHtml) as HTMLElement;
  const slider = sliderBox.querySelector('.slider') as noUiSlider.Instance;

  setTimeout(() => {
    const minValue = localStorage.getItem(key) === null ? min : localStorage.getItem(key).split(' ')[0];
    const maxValue = localStorage.getItem(key) === null ? max : localStorage.getItem(key).split(' ')[1];
    noUiSlider.create(<HTMLElement>slider, {
      start: [minValue, maxValue],
      connect: true,
      range: {
        'min': min,
        'max': max
      },
      step: 1
    });
    slider.noUiSlider.on('update', function(values: string[]) {
      slider.nextElementSibling.firstElementChild.innerHTML = values[0].slice(0, -3);
      slider.nextElementSibling.lastElementChild.innerHTML = values[1].slice(0, -3);
    });
    slider.noUiSlider.on('end', function(values: string[]) {
      localStorage.setItem(key, `${values[0].slice(0, -3)} ${values[1].slice(0, -3)}`);
      func();
    });
  });
  return sliderBox;
}