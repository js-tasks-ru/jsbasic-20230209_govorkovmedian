import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {

  #elem=createElement(`<div class="slider"></div>`);
  
  #thumb=createElement(`  <div class="slider__thumb" style="">
  </div>`);
  
  #thumbVal=createElement(`<span class='slider__value'></span>`);

  #progress=createElement(`<div class="slider__progress" style=""></div>`);

  #steps=createElement(`<div class="slider__steps"></div>`);

  #stepsNum=0;
  #current=0;

  #percentStep=0;

  constructor({ steps, value = 0 }) {
    this.#stepsNum = steps;
    this.current = value;

    this.#percentStep = 100 / (this.#stepsNum-1);

    this.build();
    this.addEvents();
  }

  get elem(){
    return this.#elem;
  }

  set current(val){
    this.#current = (val >= 0) && (val <= this.#stepsNum-1) ? val : this.#current;
  }

  build(){
    this.elem.append(this.#thumb, this.#progress, this.#steps);
    
    this.#thumbVal.innerText = this.#current;

    this.#thumb.append(this.#thumbVal);

    for(let i=0; i<this.#stepsNum; i++)
    {
      let el = document.createElement('span');
      this.#steps.append(el);
    }
    
    //this.#steps[this.#current].classList.add('slider__step-active');
    this.update();

  }

  addEvents(){

    this.elem.onclick = (event) => {
      if(event.target.closest('.slider'))
      {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRel = (this.#stepsNum-1) * (left / this.elem.offsetWidth);

        this.current = Math.round(leftRel);

        this.update();
      }
    };

  }

  update(){
    let step=this.#steps.querySelector('.slider__step-active');
    if(step != null)
      step.classList.remove('slider__step-active');

    this.#steps.children[this.#current].classList.add('slider__step-active');

    this.#thumbVal.innerText = this.#current;

    let shift=this.#current * this.#percentStep;
    this.#progress.style.width = `${shift}%`;
    this.#thumb.style.left = `${shift}%`;

    let evt=new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.#current, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    })

    this.elem.dispatchEvent(evt);
  }
}
