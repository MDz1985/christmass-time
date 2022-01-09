import snow from '../components/snow';

function getRandom(): number {
  return Math.floor((Math.random()) * 900);
}

function getRandomOf(num: number): number {
  return Math.floor((Math.random()) * num);
}

function fallSnow(element: HTMLElement): void {
  const snowBox = document.createElement('div');
  snowBox.className = 'snow-box';
  element.prepend(snowBox);
  for (let i = 0; i < 50; i++) {
    const snowflake = snow();
    snowflake.style.transform = `translateX(${getRandom() - getRandom()}px)`;
    setTimeout(() => snowBox.appendChild(snowflake), i * 1000);
  }
}

function stopSnow(): void {
  const body = document.querySelector('.body') as HTMLDivElement;
  if (document.querySelector('.snow-box')) {
    const snowBox = body.querySelector('.snow-box') as HTMLDivElement;
    body.removeChild(snowBox);
  }
}

function setSize(count: number, element: HTMLElement): void {
  element.style.width = `${10 / 49 * 100 * count}%`;
}

export { getRandom, fallSnow, stopSnow, setSize, getRandomOf };
