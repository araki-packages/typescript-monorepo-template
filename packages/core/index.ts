export namespace JSX {
  interface Element { 
  }
  interface IntrinsicElements { 
    div: string | undefined; 
  }
}
export default (element: keyof HTMLElementTagNameMap, props: {[key: string]: any} | null, ...args: any[]): HTMLElement => {
  const elWrap = document.createElement(element || null);
  props && Object.keys(props).forEach((key) => {
    elWrap.setAttribute(key, props[key]);
  });
  for (let i = 0; i < args.length; i++ ) {
    
    console.log(args[i]);
    if (typeof args[i] === 'object') {
      elWrap.appendChild(args[i]);
    } else {
      elWrap.appendChild(document.createTextNode(args[i]));
    }
  }
  return elWrap;
};