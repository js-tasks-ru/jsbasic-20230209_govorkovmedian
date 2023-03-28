import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  
  #elem=createElement(`<div class="modal">
  <!--Прозрачная подложка перекрывающая интерфейс-->
  <div class="modal__overlay"></div>

  <div class="modal__inner">
    <div class="modal__header">
      <!--Кнопка закрытия модального окна-->
      <button type="button" class="modal__close">
        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>

      <h3 class="modal__title">
      </h3>
    </div>

    <div class="modal__body">
    </div>
  </div>

</div>`);

  #open=false;
  
  constructor() {
    this.addEvents();
  }

  get elem(){
    return this.#elem;
  }

  addEvents(){

    this.#elem.addEventListener('click', ({target}) => {
      if(target.closest('.modal__close') != null)
      {
        this.close();
      }
    })
  }

  closeEvent(event){
    if(event.code === 'Escape')
      this.close();
  }

  open(){

    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', this.closeEvent.bind(this));

    this.#open = true;

  }

  setTitle(title){
    this.elem.querySelector('.modal__title').innerText = title;
  }

  setBody(body){
    let mbody = this.elem.querySelector('.modal__body');

    mbody.replaceChildren(body);
  }

  close(){
    if(!this.#open)
      return;

    document.body.removeChild(this.elem);
    document.body.classList.remove('is-modal-open');

    document.removeEventListener('keydown', this.closeEvent);

    this.#open = false;
  }
}
