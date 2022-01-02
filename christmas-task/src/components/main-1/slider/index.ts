import noUiSlider from 'nouislider';
import './index.scss';
import sliderHtml from './index.html';
import htmlFromString from '../../../utilites/htmlFromString';
import { Interface } from 'readline';


export default function(className: string, key: string, min: number, max: number, func: () => void) {
  const sliderBox = htmlFromString(sliderHtml) as HTMLElement;
  const slider = sliderBox.querySelector('.slider') as noUiSlider.Instance;
  slider.classList.add(className);
  const sliderMinValueSpan = sliderBox.querySelector('.slider-min-value') as HTMLSpanElement;
  const sliderMaxValueSpan = sliderBox.querySelector('.slider-max-value') as HTMLSpanElement;


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
      sliderMinValueSpan.innerText = values[0].slice(0, -3);
      sliderMaxValueSpan.innerText = values[1].slice(0, -3);
    });
    slider.noUiSlider.on('end', function(values: string[]) {
      localStorage.setItem(key, `${values[0].slice(0, -3)} ${values[1].slice(0, -3)}`);
      func();
    });
  });
  return sliderBox;
}
