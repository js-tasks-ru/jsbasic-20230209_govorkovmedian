import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  
  carousel_num=0;
  elem=createElement(`
    <div class="carousel">
    <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display:none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

    </div>`
  );

  
  constructor(slides) {
    this.slides = slides.map(s => new Slide(s));

    this.carousel_num = this.slides.length;

    this.render();
    this.addEvents();
  }

  render() {
    let inner=createElement(`<div class="carousel__inner"></div>`);
    this.slides.map(s=>{let el=s.render(); inner.insertAdjacentElement('beforeend', el);});

    this.elem.insertAdjacentElement('beforeend', inner);
  }

  addEvents() {

    let current = 0, obj=null;

    this.elem.onclick = (evt) => {      

      let shift=document.querySelector('.carousel__slide').offsetWidth,      
        arrow_left = document.querySelector('.carousel__arrow_left'),
        arrow_right = document.querySelector('.carousel__arrow_right'),
        carousel_inner = document.querySelector('.carousel__inner');

      // arrow_left
      if((obj=evt.target.closest('.carousel__arrow_left')) != null)
      {
        current -= 1;
        carousel_inner.style.transform = `translateX(${-current*shift}px)`;

        arrow_right.style.display = '';
        
        if(current <= 0)
        {
          obj.style.display = 'none';
          current = 0;
        }
      }
      // arrow_right
      else if((obj=evt.target.closest('.carousel__arrow_right')) != null)
      {
        current += 1;
        carousel_inner.style.transform = `translateX(${-current*shift}px)`;

        arrow_left.style.display = '';
        
        if(current >= this.carousel_num-1)
        {
          obj.style.display = 'none';
          current = this.carousel_num-1;
        }
      }
      else if((obj=evt.target.closest('.carousel__button')) != null)
      {
        let slide=obj.closest('.carousel__slide');
        let evt = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: slide.getAttribute('data-id'), // Уникальный идентификатора товара из объекта слайда
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });

        this.elem.dispatchEvent(evt);
      };
    }


  }

  

}

`{
  name: 'Penang shrimp', // Название товара со слайда
  price: 16, // Цена товара со слайда
  image: 'penang_shrimp.png', // Название файла картинки со слайда
  id: 'penang-shrimp' // Уникальный идентификатор товара со слайда
}`

class Slide{

  constructor(slide){
    this.name = slide.name;
    this.price = slide.price;
    this.image = slide.image;
    this.id = slide.id;
  }

  render(){
    let elem = createElement(`<div class="carousel__slide" data-id="${this.id}">
    <img src="/assets/images/carousel/${this.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${this.price.toFixed(2)}</span>
      <div class="carousel__title">${this.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>`);

    return elem;
  }
}