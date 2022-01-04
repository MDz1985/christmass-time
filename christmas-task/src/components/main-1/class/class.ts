import data from '../../../data';
import { ICard } from '../../../utilites/interfaces';
import { localStorageObject, objFromLS } from '../../../utilites/consts';


if (!localStorage.getItem('object')) {
  localStorage.setItem('object', JSON.stringify(localStorageObject));
}


class Cards {
  data: ICard[];


  constructor() {
    this.data = data;
  }

  // getValFromLS(value: string): string[] {
  //   return objFromLS[value];
  //   // return localStorage.getItem(value).split(' ');
  // }

  filterData() {
    return this.data.filter((value) => {
      return !!value.chosen;
    });

  }


  returnResultArray() {
    // const resultArray: ICard[] = [];

    // for (let i = 0; i < this.data.length; i++) {
    //
    //
    //
    //   for (let j = 0; j < this.textValArray.length; j++) {
    //
    //
    //     if (this.getValFromLS(this.textValArray[j]).includes(this.data[i][this.textValArray[j]])) {
    //       if (j === this.textValArray.length - 1) {
    //         if (Number(this.data[i].count) >= Number(this.getValFromLS('counts')[0])
    //           && Number(this.data[i].count) <= Number(this.getValFromLS('counts')[1])
    //           && Number(this.data[i].year) >= Number(this.getValFromLS('years')[0])
    //           && Number(this.data[i].year) <= Number(this.getValFromLS('years')[1])) {
    //           if (this.data[i].name.toUpperCase().includes(String(localStorage.getItem('name')).toUpperCase())
    //             || localStorage.getItem('name') === null) {
    //
    //             resultArray.push(this.data[i]);
    //           }
    //         }
    //       }
    //     } else {
    //       j = this.textValArray.length - 1;
    //     }
    //   }
    // }

    return this.data.filter(element => {
        return Number(element.count) >= Number(objFromLS.counts[0]) &&
          Number(element.count) <= Number(objFromLS.counts[1]) &&
          Number(element.year) >= Number(objFromLS.years[0]) &&
          Number(element.year) <= Number(objFromLS.years[1]) &&
          objFromLS.shape.includes(element.shape) &&
          objFromLS.color.includes(element.color) &&
          objFromLS.size.includes(element.size) &&
          objFromLS.favorite.includes(element.favorite) &&
          (element.name.toUpperCase().includes(objFromLS.name.toUpperCase()) || objFromLS.name === '');
      }
    );
  }
}

export default Cards;
