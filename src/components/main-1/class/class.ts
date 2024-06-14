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


  filterData(): ICard[] {
    return this.data.filter((value) => {
      return !!value.chosen;
    });

  }

  returnResultArray(): ICard[] {

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
