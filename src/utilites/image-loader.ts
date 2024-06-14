import { localStorageObject } from './consts';

export default function setBg(element: HTMLElement, number: number): void {
  const img = new Image();
  img.src = `${localStorageObject.toysUrl}${number}.png`;

  img.addEventListener('load', () => {
    element.style.background = `url('${localStorageObject.toysUrl}${number}.png') no-repeat`;
    element.style.backgroundSize = 'contain';
    element.style.backgroundPositionX = 'center';

  });
}


