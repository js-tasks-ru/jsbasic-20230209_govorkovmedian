function toggleText() {
  // ваш код...

  document.querySelector('.toggle-text-button').onclick = function(evt){
    let target = document.querySelector('#text');
    target.hidden = !target.hidden;
  };

}
