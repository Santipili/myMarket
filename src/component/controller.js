class shopController
{
  constructor(view, model)
  {
    this.innerView = view;
    this.innerModel = model;

    this.chargeProducts();

    this.innerView.productsList.addEventListener("click", (event) =>{
      const target = event.target;

      if (target.tagName === 'BUTTON') {
        switch (target.className)
        {
          case "plus":
            this.onPlusButtonClick(target);
          break;
          
          case "substract":
            this.onSubstractButtonClick(target);
          break;

          case "add":
            this.onAddButtonClick(target);

        }
      }      
    })

    //Esto tengo q cambiarlo porq el boton si lo tengo creado en la vista y no por una funcion como los elementos de la tabla
    
    this.innerView.shoppingCart.addEventListener('click', (event) => {
      const target = event.target

      if (target.tagName === 'BUTTON') {

        this.onBuyButtonClick()

        //----------------------------------------
        // Debo hacer un switch con target.className para poder eliminar productos del carrito. Voy a tener una 'X' como "botton" en cada linea
        //----------------------------------------
      }
    })

  }

  chargeProducts()
  {
    //const productos = JSON.parse(this.innerModel.productsData);
    this.innerModel.productsData.forEach(producto => {
      this.innerView.addProduct(producto);
    });  
  }

  onPlusButtonClick(target)
  {
    //----------------------------------------------- 
    // debo agregar que si esta agegado el el carrito fijarme la cantidad agregada y controlar para q no me deje agregar mas, ni el contador suba
    // lo que tenga en el carrito se lo debo restar a la cantidad maxima, pero solo en logia y no en el stock
    //----------------------------------------------- 

    const quantityDisplay = this.innerView.getDisplay(target);    
    let currentQuantity = parseInt(quantityDisplay.innerHTML);
    
    const idProduct = this.innerView.getProductID(target);
    const maxQuantity = this.innerModel.getMaxQuantity(idProduct);
    
    if (currentQuantity < maxQuantity) {currentQuantity++}; //Esto deberia estar en el modelo??

    quantityDisplay.innerHTML = currentQuantity.toString();
  }

  onSubstractButtonClick(target)
  {
    const quantityDisplay = this.innerView.getDisplay(target);
    let currentQuantity = parseInt(quantityDisplay.innerHTML);

    if (currentQuantity > 0) {currentQuantity--}; //Esto deberia estar en el modelo??

    quantityDisplay.innerHTML = currentQuantity.toString();
  }

  onAddButtonClick(target)
  {
    let productData = this.innerView.getProductData(target);
    this.innerView.addProductToShoppingCart(productData);
  }

  onBuyButtonClick() 
  {
    const shoppingListToBuy = this.innerView.getBuyList();
    this.innerModel.sellShoe(shoppingListToBuy); 
  }

  onDeleteProductClick(target)
  {

  }
  
}

export {shopController};