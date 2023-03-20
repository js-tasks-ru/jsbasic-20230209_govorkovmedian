import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  
  #elem=null;
  
  constructor(product) {
    this.product = product;
  }

  get elem(){
    if(this.#elem != null)
      return this.#elem;
    
    this.#elem = createElement(`
    <div class="card" data-id="${this.product.id}">
        <div class="card__top">
            <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
            <span class="card__price">€${this.getPrice()}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div>`);

    this.addEventListener();

    return this.#elem;
  }

  getPrice(){
    return this.product.price.toFixed(2);
  }

  addEventListener(){

    this.#elem.onclick = ({target}) => {

      if(target.closest('.card__button') != null)
      {
        let evt = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: this.product.id, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });

        this.#elem.dispatchEvent(evt);

      }
    }
  }
}
