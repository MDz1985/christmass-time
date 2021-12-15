export default function setBg(element: HTMLElement, number: number) {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/toys/${number}.png`;

  img.addEventListener('load', (event) => {
    element.style.background = `url('https://raw.githubusercontent.com/MDz1985/assets/christmas-task/christmas-task/toys/${number}.png') no-repeat`;
    element.style.backgroundSize = 'contain';
    element.style.backgroundPositionX = 'center';

  });
}
