function firstLsSet() {
  localStorage.removeItem('name');
  if (!localStorage.getItem('sort')) {
    localStorage.setItem('sort', 'ascending');
  }
  if (!localStorage.getItem('count')) {
    localStorage.setItem('count', '12');
  }
  if (!localStorage.getItem('year')) {
    localStorage.setItem('year', '2021');
  }
  if (!localStorage.getItem('shape')) {
    localStorage.setItem('shape', 'шар снежинка фигурка колокольчик шишка');
  }
  if (!localStorage.getItem('color')) {
    localStorage.setItem('color', 'красный синий белый зелёный желтый');
  }
  if (!localStorage.getItem('size')) {
    localStorage.setItem('size', 'большой средний малый');
  }
  if (!localStorage.getItem('favorite')) {
    localStorage.setItem('favorite', 'да нет');
  }
}


function rmFromLS(key: string, value: string) {
  const lsValue = localStorage.getItem(key);
  const result = lsValue.split(' ').filter(word => word !== value).join(' ');
  localStorage.setItem(key, result);
}

function addToLS(key: string, value: string) {
  const lsValue = localStorage.getItem(key);
  const resultArray = lsValue.split(' ').filter(word => word !== value);
  resultArray.push(value);
  const result = resultArray.join(' ');
  localStorage.setItem(key, result);
}

export { firstLsSet, rmFromLS, addToLS };