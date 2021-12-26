import data from '../../../data';
import { iCard } from '../../../utilites/interfaces';
import { firstLsSet } from '../../../utilites/functions';

firstLsSet();

class Cards {
  data: iCard[];
  private readonly textValArray: string[];

  constructor() {
    this.data = data;

    this.textValArray = ['shape', 'color', 'size', 'favorite'];
    // this.numValArray = ['count', 'year'];
  }

  getValFromLS(value: string): string[] {
    return localStorage.getItem(value).split(' ');
  }

  filterData() {
    return this.data.filter((value) => {
      return !!value.chosen;
    });

  }


  returnResultArray() {
    const resultArray: iCard[] = [];
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.textValArray.length; j++) {
        if (this.getValFromLS(this.textValArray[j]).includes(this.data[i][this.textValArray[j]])) {
          if (j === this.textValArray.length - 1) {
            if (Number(this.data[i].count) >= Number(this.getValFromLS('counts')[0])
              && Number(this.data[i].count) <= Number(this.getValFromLS('counts')[1])
              && Number(this.data[i].year) >= Number(this.getValFromLS('years')[0])
              && Number(this.data[i].year) <= Number(this.getValFromLS('years')[1])) {
              if (this.data[i].name.toUpperCase().includes(String(localStorage.getItem('name')).toUpperCase())
                || localStorage.getItem('name') === null) {

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
