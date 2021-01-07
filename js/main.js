'use strict';

let basket = document.getElementsByClassName('basket');
let baskett = document.getElementById('baskett');
let clear = document.getElementById('clear');
let money  = document.getElementById('money');
let elem = document.querySelector('.row').cloneNode(true);
let arrayOfProducts = [
    {
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
      "name": "CHECK PRINT SHIRT",
      "price": 110
    },
    {
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
      "name": "GLORIA HIGH LOGO SNEAKER",
      "price": 91
    },
    {
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
      "name": "CATE RIGID BAG",
      "price": 94.5
    },
    {
      "imgUrl": "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
      "name": "GUESS CONNECT WATCH",
      "price": 438.9
    },
    {
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
      "name": "'70s RETRO GLAM KEFIAH",
      "price": 20
    }
  ];
let itemsArrey = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')):[];
let count = itemsArrey.length;
let result;

if(localStorage.getItem('summa')) result=localStorage.getItem('summa')
else result = 0;
money.innerHTML = result;

for (let i=0; i<basket.length; i++) {
  basket[i].addEventListener('click', ()=>{  
    count=itemsArrey.length;
    itemsArrey.push(arrayOfProducts[i]);
    localStorage.setItem('items', JSON.stringify(itemsArrey));  
    createItem(itemsArrey[count].imgUrl, itemsArrey[count].name, itemsArrey[count].price);

    if(localStorage.getItem('summa')) result = Number(localStorage.getItem('summa'));
    else result = 0;
    result += itemsArrey[count].price;
    localStorage.setItem('summa', JSON.stringify(result));  
    money.innerHTML = result;  
  })
}

clear.addEventListener('click', ()=>{
    localStorage.clear(); 
    itemsArrey = [];
    money.innerHTML = 0;
    let rows = document.querySelectorAll('.row');
    for (let j=0; j<rows.length; j++) {
      rows[j].remove();      
    }
})

const createItem = (imgUrl, name, price)=>{
  let itemElem = elem.cloneNode(true);
  itemElem.classList.remove('noneDisplay');
  let image = itemElem.children[0];
  let nameElem =  itemElem.children[1];
  let pricesElem = itemElem.children[2];
  image.style.backgroundImage = `url(${imgUrl})`;
  nameElem.innerHTML = name;
  pricesElem.innerHTML = price;
  let clearElem = itemElem.children[3];    

  clearElem.addEventListener('click', function () {
  this.parentElement.remove();
    for (let i=0; i<itemsArrey.length; i++) {    
        if(itemsArrey[i].name==name) {        
          result = Number(localStorage.getItem('summa'));        
          result -= itemsArrey[i].price;
          localStorage.setItem('summa', JSON.stringify(result));           
          money.innerHTML = result;           
          itemsArrey.splice(i,1);
          break;       
      }
    }   
    localStorage.setItem('items', JSON.stringify(itemsArrey));   
    })
  baskett.append(itemElem);      
};

for (let i=0; i<itemsArrey.length; i++) {
  createItem(itemsArrey[i].imgUrl, itemsArrey[i].name, itemsArrey[i].price);    
}