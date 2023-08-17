import { shopView } from "./component/view.js";
import { shopModel } from "./component/model.js";
import { shopController } from "./component/controller.js";

class shopComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.innerView = new shopView();
        this.innerModel = new shopModel(this.innerView);
        this.innerController = new shopController(this.innerView, this.innerModel );
    }

    connectedCallback()
  {
    
  }
  
  disconnectedCallback()
  {
    
  }
}

customElements.define('x-shop', shopComponent);

export { shopComponent};