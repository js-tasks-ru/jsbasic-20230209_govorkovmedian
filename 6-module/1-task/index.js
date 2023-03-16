/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  
  #elem=null;
  #children=[];

  constructor(rows) {
    let arr=["Имя","Возраст","Зарлата","Город"];

    rows.map(r => this.#children.push(new User(r)));

  }

  get elem(){
    if(this.#elem != null)
      return this.#elem;

    let elem=document.createElement('table');
    let head=elem.createTHead(),
      headRow = document.createElement('tr'),
      body=document.createElement('tbody');

    ["Имя","Возраст","Зарлата","Город",""].map(field => {let c=document.createElement('th'); c.innerText=field; headRow.append(c);});

    head.insertAdjacentElement('beforeend', headRow);
    elem.insertAdjacentElement('beforeend', body);

    this.#children.map(c => {body.append(c.elem)});


    //this.#children.map(c => {})

    this.#elem = elem;
    return this.#elem;

  }


}

class User {

  #elem=null;
  #obj=null;

  constructor(obj){
    this.#obj = obj;
  }

  hide(){
    this.#elem.parentNode.removeChild(this.#elem);
  }

  get elem(){
    if(this.#elem != null)
      return this.#elem;

    let elem=document.createElement('tr'),
      th=null;

    for(let f in this.#obj){
      th = document.createElement('th');
      th.innerText = this.#obj[f];
      elem.append(th);
    }

    th = document.createElement('th');
    let button=document.createElement('button');
    button.innerText = 'X';
    button.onclick = this.hide.bind(this);
    th.append(button);

    elem.append(th)

    return this.#elem = elem;

  }
}
