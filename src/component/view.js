
class shopView extends HTMLElement
{
  constructor()
  {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.productsList = document.createElement('section');
    this.productsList.classList.add('productsList');

    this.div1 = document.createElement('div');
    this.productsTitle = document.createElement('div');
    this.productsTitle.classList.add('productsTitle');

    this.imgProducts = document.createElement('img');
    this.imgProducts.id = "marketImg";
    this.productsH3 = document.createElement('h3');
    this.productsH3.innerHTML = "My Market";
    this.productsTitle.appendChild(this.imgProducts);
    this.productsTitle.appendChild(this.productsH3);

    this.div1.appendChild(this.productsTitle);
    this.div1.appendChild(this.productsList);
    

    this.shoppingCart = document.createElement('section');
    this.shoppingCart.classList.add('cart');
    this.titleContainer = document.createElement('div');
    this.titleContainer.classList.add('titleCart');
    this.imgCart = document.createElement('img');
    this.imgCart.id = "shoppingCartImg";
    this.titleCart = document.createElement('h3');
    this.titleCart.innerHTML = "Tu Compra";

    this.titleContainer.appendChild(this.imgCart);
    this.titleContainer.appendChild(this.titleCart);

    this.shoppingList = document.createElement('table');
    this.shoppingList.classList.add('shoppingList');
    this.shoppingListHeader = document.createElement('thead');
    this.shoppingListBody = document.createElement('tbody');
    
    this.shoppingListHeaderRow = document.createElement('tr');
    this.shoppingListFirstColumn = document.createElement('th');
    this.shoppingListFirstColumn.innerHTML = "Product Name";
    this.shoppingListFirstColumn.classList.add('productColumn');
    this.shoppingListSecondColumn = document.createElement('th');
    this.shoppingListSecondColumn.innerHTML = "Cant.";
    this.shoppingListSecondColumn.classList.add('cantColumn');
    this.shoppingListThirdColumn = document.createElement('th');
    this.shoppingListThirdColumn.innerHTML = "Price";
    this.shoppingListThirdColumn.classList.add('priceColumn');

    this.shoppingListHeaderRow.appendChild(this.shoppingListFirstColumn);
    this.shoppingListHeaderRow.appendChild(this.shoppingListSecondColumn);
    this.shoppingListHeaderRow.appendChild(this.shoppingListThirdColumn);
    this.shoppingListHeader.appendChild(this.shoppingListHeaderRow);
    this.shoppingList.appendChild(this.shoppingListHeader);
    this.shoppingList.appendChild(this.shoppingListBody);

    this.totalCart = document.createElement('div');
    this.totalCart.classList.add('totalContainer');
    this.totalP = document.createElement('p');
    this.totalP.innerHTML = "TOTAL: $"
    this.totalP.classList.add('total');
    this.totalPrice = document.createElement('span');
    this.totalPrice.classList.add('totalPrice');
    this.totalPrice.innerHTML = "0.00";

    this.totalP.appendChild(this.totalPrice);
    this.totalCart.appendChild(this.totalP);

    this.buyButton = document.createElement('button');
    this.buyButton.classList.add('buyButton');
    this.buyButton.innerHTML = "BUY";
    this.buyContainer = document.createElement('div');
    this.buyContainer.classList.add('buyContainer');
    this.buyContainer.appendChild(this.buyButton);

    this.shoppingCart.appendChild(this.titleContainer);
    this.shoppingCart.appendChild(this.shoppingList);
    this.shoppingCart.appendChild(this.totalCart);
    this.shoppingCart.appendChild(this.buyContainer)


    this.container.appendChild(this.div1);
    this.container.appendChild(this.shoppingCart);

    this.appendChild(this.container); 
  }
  
  connectedCallback()
  {
    
  }
  
  disconnectedCallback()
  {
    
  }
  
  getProductData(target)
  {
    let productData ={};
    const elementData = target.parentNode.parentNode;    

    if (elementData.childNodes[5].childNodes[1].innerHTML !== "0" ) 
    {      
      productData.name = elementData.childNodes[1].innerHTML;
      productData.quantity = elementData.childNodes[5].childNodes[1].innerHTML;
      productData.price = elementData.childNodes[3].innerHTML.replace("$","").replace(" ","");
      productData.id = elementData.childNodes[4].innerHTML;  
    } 

    elementData.childNodes[5].childNodes[1].innerHTML = 0;

    return productData;
  }

  getProductID(target)
  {
    const elementData = target.parentNode.parentNode;    
    return elementData.childNodes[4].innerHTML;

  }

  getDisplay(target) 
  {
    switch (target.className)
    {
      case "plus":
        return target.previousElementSibling;
      
      case "substract":
        return target.nextElementSibling;
    }  
  }

  addProduct(data)
  {
    let product = document.createElement('article');    
    
    let dataContainer = document.createElement('div');  
    dataContainer.classList.add('dataContainer');  
    
    let productImg = document.createElement('img');

    productImg.alt = data.nombre;
    productImg.src = "./src/img" + data.imagenURL;
    productImg.classList.add('imgShoe');

    let productTitle = document.createElement('h3');
    productTitle.innerText = data.nombre;    
    

    let productDescription = document.createElement('p');
    productDescription.innerHTML = data.descripcion;

    let productPrice = document.createElement('p');
    productPrice.innerText = "$ "+data.precio;

    let productID = document.createElement('p');
    productID.innerText = data.itemN;
    productID.style.display = "none";

    let substractButton = document.createElement('button');
    substractButton.classList.add("substract");

    let displayQuantity = document.createElement('span');
    displayQuantity.innerHTML = '0';

    let plusButton = document.createElement('button');
    plusButton.classList.add("plus");

    let quantityContainer = document.createElement('div');
    quantityContainer.appendChild(substractButton);
    quantityContainer.appendChild(displayQuantity);
    quantityContainer.appendChild(plusButton);
    quantityContainer.classList.add("quantityContainer")
    
    let addButton = document.createElement('button');
    addButton.innerText = 'add';
    addButton.classList.add("add");
    let addContainer = document.createElement('div');
    addContainer.classList.add('addContainer');
    addContainer.appendChild(addButton)

    dataContainer.appendChild(productImg);
    dataContainer.appendChild(productTitle);
    dataContainer.appendChild(productDescription);
    dataContainer.appendChild(productPrice);
    dataContainer.appendChild(productID);
    dataContainer.appendChild(quantityContainer);    
    dataContainer.appendChild(addContainer);

    product.appendChild(dataContainer);

    this.productsList.appendChild(product);
  }

  addProductToShoppingCart(data)
  { 
    let table = this.shoppingListBody.querySelectorAll('tr');
    let added = false; 
    
    table.forEach(row => {
      let cells = row.querySelectorAll('td');
      if (data.id === cells[3].innerHTML ){
        let quantity = parseInt(cells[1].innerHTML);
        quantity += parseInt(data.quantity);    
        cells[1].innerHTML = quantity.toString();
          
        added = true;
      }
      
    }); 

    if (!added) 
    {
      
      let productTitle = document.createElement('td');
      productTitle.innerHTML = data.name;
      
      let productQuantity = document.createElement('td');
      productQuantity.innerHTML = data.quantity;
      productQuantity.classList.add('cantBody')
  
      let productPrice = document.createElement('td')
      productPrice.innerHTML = data.price;
  
      let bodyRow = document.createElement('tr');
  
      let productID = document.createElement('td');
      productID.innerHTML = data.id;
      productID.style.display = "none";
  
      bodyRow.appendChild(productTitle);
      bodyRow.appendChild(productQuantity);
      bodyRow.appendChild(productPrice);
      bodyRow.appendChild(productID);
  
      this.shoppingListBody.appendChild(bodyRow);
      
    }
   

    let price = parseFloat(this.totalPrice.innerHTML);
    price += parseFloat(data.price)*parseInt(data.quantity);    
    this.totalPrice.innerHTML = price.toString();

  }

  getBuyList()
  {
    let data = [];
    let table = this.shoppingListBody.querySelectorAll('tr');

    table.forEach(row => {
      let shoe = {};

      let cells = row.querySelectorAll('td');
      shoe.id = cells[3].innerHTML;
      shoe.cant = cells[1].innerHTML;

      data.push(shoe);     
      
      this.shoppingListBody.removeChild(row);

    }); 
    
    this.totalPrice.innerHTML = "0.00";

    return data;
  }

}

customElements.define('x-shop-view', shopView);

export  {shopView};