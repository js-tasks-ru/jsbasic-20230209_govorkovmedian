import createElement from '../../assets/lib/create-element.js';
import htmlescape from '../../assets/lib/escape-html.js'

export default class RibbonMenu{

	#elem=createElement(`<div class="ribbon"><div class='ribbon__inner'></div></div>`);
	#shift=0;

	constructor(categories){
		this.categories = categories.map(c => {return new Category(c)});

		this.render();
		this.addEventsDispatch();

	}

	render(){
    let buttonLeft=createElement(`<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`);
    let buttonRight=createElement(`<button class="ribbon__arrow ribbon__arrow_right">
<img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>`);

    this.elem.insertAdjacentElement('afterbegin', buttonLeft);
	this.categories.map(c => {this.#elem.querySelector('.ribbon__inner').insertAdjacentElement('beforeend', c.elem)});
    this.elem.insertAdjacentElement('beforeend', buttonRight);
	}

	get elem(){
		return this.#elem;
	}

	get shift(){
		return this.#shift;
	}

	set shift(val){
		this.#shift = val;
	}


	addEventsDispatch(){

		this.#elem.onclick = ({target}) => {

			if(target.closest('.ribbon__arrow_right') != null)
			{
				this.shift = 350;
			}
			else if(target.closest('.ribbon__arrow_left') != null)
			{
				this.shift = -350;
			}

			this.updateRendering();
		}

		this.elem.addEventListener('DOMContentLoaded', this.updateRendering, {'once': true});

	}

	updateRendering(){
		let ribbonInner=this.elem.querySelector('.ribbon__inner');
		let	scrollLeft=ribbonInner.scrollLeft,
			scrollWidth=ribbonInner.scrollWidth,
			clientWidth=ribbonInner.clientWidth;

		let scrollRight=scrollWidth - scrollLeft - clientWidth;

		ribbonInner.scrollBy(this.shift, 0);
		this.shift = 0; //protect from shifting again

		if(scrollLeft <= 1)
		{
				document.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
				document.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
		}

		if(scrollRight <= 1)
		{
			document.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
			document.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
		}

	}

};

class Category{
	#elem=null;

	constructor(cat){
		this.id = cat.id;
		this.name = cat.name;

		this.addEvent();
	}

	get elem(){
		if(this.#elem != null)
			return this.#elem;

		this.#elem = createElement(`<a href="#" class="ribbon__item" data-id="${this.id}">${htmlescape(this.name)}</a>`);

		return this.#elem;
	}

	addEvent(){
		this.elem.addEventListener('click', (event) => {
			event.preventDefault();

			let prev=document.querySelector('.ribbon__item_active'),
				evt=new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
				  detail: this.id, // уникальный идентификатора категории из её объекта
				  bubbles: true // это событие всплывает - это понадобится в дальнейшем
				});

			if(prev)
				prev.classList.remove('ribbon__item_active');

			this.elem.classList.add('ribbon__item_active');

			this.elem.dispatchEvent(evt);
		})
	}
}
