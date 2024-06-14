import noUiSlider from 'nouislider';
import './index.scss';
import sliderHtml from './index.html';
import htmlFromString from '../../../utilites/htmlFromString';
import { Interface } from 'readline';
import { objFromLS } from '../../../utilites/consts';

const globalObj = objFromLS;


export default function(className: string, key: string, min: number, max: number, doOnClick: () => void) {
  const sliderBox = htmlFromString(sliderHtml) as HTMLElement;
  const slider = sliderBox.querySelector('.slider') as noUiSlider.Instance;
  slider.classList.add(className);
  const sliderMinValueSpan = sliderBox.querySelector('.slider-min-value') as HTMLSpanElement;
  const sliderMaxValueSpan = sliderBox.querySelector('.slider-max-value') as HTMLSpanElement;


  setTimeout(() => {
    const minValue = globalObj[key] === '' ? min : globalObj[key][0];
    const maxValue = globalObj[key] === '' ? max : globalObj[key][1];
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
      globalObj[key] = [values[0].slice(0, -3), values[1].slice(0, -3)];
      localStorage.setItem('object', JSON.stringify(globalObj));
      doOnClick();
    });
  });
  return sliderBox;
}
