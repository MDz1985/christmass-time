// import cardsData from '../../../data.json';
import data from '../../../data';
import { resolve } from 'dns';

interface iCard{
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

for (let i = 0; i < data.length; i++){
  console.log(1);
}
class Cards {
  private readonly data: iCard[];

  constructor() {
    this.data = data;

  }
}
export default Cards;
