// import events from 'node:events';

declare module '*.html' {
  const content: string;
  export default content;
}


declare namespace noUiSlider {

  interface noUiSlider {
    on: (string:string, Function:(string:string[])=>void) => void;
    updateOptions?: (obl:{ start: number[]}, boolean:boolean) => void;
  }

  interface Instance extends HTMLElement {
    noUiSlider: noUiSlider
  }
}



