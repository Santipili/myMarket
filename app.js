import {shopComponent} from './src/shop.js';

function main()
{
  let shopApp= new shopComponent();
  document.body.appendChild(shopApp.innerView);
}

window.addEventListener('load', main);