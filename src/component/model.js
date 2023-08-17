class shopModel
{
  constructor(viewReference)
  {
    this.innerView = viewReference;
    // this.productsData lo cree aqui, pero deberia utilizar una base de datos y con node modificar su stock, 
    // debo hacer consultas a una API externa o a mi DB
    this.productsData = [
      {
        "nombre": "Zapatillas Nike Air Max Excee",
        "descripcion": "Descripción del producto 1",
        "marca": "Nike",
        "modelo": "Air Max Excee",
        "precio": 57.499,
        "cantidad": 10,
        "imagenURL": "/zapatillas/nike_airMax_excee.jpg",
        "itemN": "NICD4165-001"
      },
  
      {
        "nombre": "Zapatillas Nike Air Max Sc",
        "descripcion": "Descripción del producto 2",
        "marca": "Nike",
        "modelo": "Air Max Sc",
        "precio": 45.999,
        "cantidad": 5,
        "imagenURL": "/zapatillas/nike_airMax_sc.jpg",
        "itemN": "NICW4555-012"
      },
  
      {
        "nombre": "Zapatillas Nike Court Vision Mid",
        "descripcion": "Descripción del producto 3",
        "marca": "Nike",
        "modelo": "Court Vision Mid",
        "precio": 42.999,
        "cantidad": 20,
        "imagenURL": "/zapatillas/nike_courtVisionMid.jpg",
        "itemN": "NIDM8682-001"
      },

      {
        "nombre": "Zapatillas Nike Court Vision Mid Next Nature",
        "marca": "Nike",
        "modelo": "Court Vision Mid Next Nature",
        "descripcion": "Descripción del producto 2",
        "precio": 45.999,
        "cantidad": 7,
        "imagenURL": "/zapatillas/nike_courtVisionMid_nextNature.jpg",
        "itemN": "NIDN3577-600"
      },

      {
        "nombre": "Zapatillas Running Nike Revolution 6",
        "marca": "Nike",
        "modelo": "Revolution 6",
        "descripcion": "Descripción del producto 2",
        "precio": 34.999,
        "cantidad": 25,
        "imagenURL": "/zapatillas/nike_revolution6.jpg",
        "itemN": "NIDC3728-012"
      },

      {
        "nombre": "Zapatillas Running Nike Air Winflo 9",
        "marca": "Nike",
        "modelo": "Air Winflo 9",
        "descripcion": "Descripción del producto 2",
        "precio": 56.999,
        "cantidad": 15,
        "imagenURL": "/zapatillas/nike_winflo9.jpg",
        "itemN": "NIDD6203-004"
      }
    ]

    
  }

  getMaxQuantity(idProduct)
  {
    for (const shoe of this.productsData) {
      if (shoe.itemN === idProduct){
        return shoe.cantidad;
      }
    }
  }

  sellShoe(sellList) 
  {
    //Esto esta muy mal? en cuanto diseño

    for (const product of sellList)
    {
      for (const shoe of this.productsData) 
      {
        if (shoe.itemN === product.id)
        {
          if (product.cant <= shoe.cantidad) 
          {
          shoe.cantidad -= product.cant;
          }
        }
      }
    }   

  }



}

export {shopModel};