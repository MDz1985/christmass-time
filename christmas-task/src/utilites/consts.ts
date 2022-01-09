import { ILocalStorage } from './interfaces';
import data from '../data';


const localStorageObject: ILocalStorage = {
  data: data,
  garland: '',
  favorite: ['да', 'нет'],
  counts: ['0', '12'],
  name: '',
  years: ['1940', '2021'],
  shape: ['шар', 'снежинка', 'фигурка', 'колокольчик', 'шишка'],
  color: ['красный', 'синий', 'белый', 'зелёный', 'желтый'],
  size: ['большой', 'средний', 'малый'],
  sort: ['ascending'],
  tree: '',
  bg: '',
  volume: '',
  url: 'https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/',
  toysUrl: 'https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/toys/',
  treesUrl: 'https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/tree/',
  bgUrl: 'https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/bg/',
  toysProperties: ['Количество', 'Год покупки', 'Форма игрушки', 'Цвет игрушки', 'Размер игрушки', 'Любимая', 'Избранная'],
  snowfall: '',
  chosen: 0,
  sizesArray: ['большой', 'средний', 'малый'],
  colorsArray: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
  shapesArray: ['колокольчик', 'шар', 'шишка', 'снежинка', 'фигурка'],
  sortSelectValuesArray: ['По возрастанию', 'По убыванию', 'По возрастанию (год)', 'По убыванию (год)', 'По возрастанию (название)', 'По убыванию (название)'],
  yearsSlider: {min: 1940, max: 2021, className: 'years-slider', key:'years'},
  countsSlider: {min: 1, max: 12, className: 'counts-slider', key:'counts'}
};


if (!localStorage.getItem('object')) {
  localStorage.setItem('object', JSON.stringify(localStorageObject));
}
const objFromLS = JSON.parse(<string>localStorage.getItem('object'));

export { localStorageObject, objFromLS };
