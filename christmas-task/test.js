let a = 'тест';
let obj = {
  shape: 'тест'


};

console.log(a.split(' '));
let array;

if (a.split(' ').includes(obj.shape)) {
  console.log('!!!!');
}

let b = a.split(' ').filter(word => word !== 'торт')
  b.push('торт');
b = b.join(' ');

function rmFromLS(key, value) {
  const lsValue = localStorage.getItem(key);
  const result = lsValue.split(' ').filter(word => word !== value).join(' ');
  localStorage.setItem(key, result);
}

function addToLS(key, value) {
  const lsValue = localStorage.getItem(key);
  const resultArray = lsValue.split(' ').filter(word => word !== value);
  resultArray.push(value);
  const result = resultArray.join(' ');
  localStorage.setItem(key, result);
}


console.log(b, '!!!');
import noUiSlider from 'nouislider';

const slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  range: {
    'min': 0,
    'max': 100
  }
});
