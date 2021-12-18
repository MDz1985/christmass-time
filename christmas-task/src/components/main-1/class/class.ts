// import cardsData from '../../../data.json';
import data from '../../../data';
import { resolve } from 'dns';
import { iCard } from '../../../utilites/interfaces';

// interface iCard {
//   num: string;
//   name: string;
//   count: string;
//   year: string;
//   shape: string;
//   color: string;
//   size: string;
//   favorite: string;
// }


localStorage.setItem('sort', 'ascending');
localStorage.removeItem('name');
// localStorage.setItem('name', 'Голубой  шар Метель');
localStorage.setItem('count', '30');
localStorage.setItem('year', '2021');
localStorage.setItem('shape', 'шар снежинка фигурка колокольчик шишка');
localStorage.setItem('color', 'красный синий белый зелёный желтый');
localStorage.setItem('size', 'большой средний малый');
localStorage.setItem('favorite', 'да нет');


class Cards {
  private readonly data: iCard[];
  private readonly textValArray: string[];

  constructor() {
    this.data = data;

    this.textValArray = ['shape', 'color', 'size', 'favorite'];
    // this.numValArray = ['count', 'year'];
  }

  getValFromLS(value: string): string[] {
    return localStorage.getItem(value).split(' ');
  }


  returnResultArray() {
    let test = false;
    let resultArray: iCard[] = [];
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.textValArray.length; j++) {
        if (this.getValFromLS(this.textValArray[j]).includes(this.data[i][this.textValArray[j]])) {
          if (j === this.textValArray.length - 1) {
            if (Number(this.data[i].count) <= Number(this.getValFromLS('count'))
              && Number(this.data[i].year) <= Number(this.getValFromLS('year'))) {
              if (this.data[i].name === localStorage.getItem('name')
                || localStorage.getItem('name')  === null){

                resultArray.push(this.data[i]);
              }
            }
          }
        } else {
          j = this.textValArray.length - 1;
        }
      }
    }
    return resultArray;
  }
}

export default Cards;
