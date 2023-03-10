function initCarousel() {
  // ваш код...

  let carousel_num = document.querySelector('.carousel__inner').children.length,
   arrow_left = document.querySelector('.carousel__arrow_left'),
   arrow_right = document.querySelector('.carousel__arrow_right'),
   carousel_inner = document.querySelector('.carousel__inner');;

  (() => {

    let current=0;

    document.querySelector('.container').onclick = (evt) => {

      let shift=document.querySelector('.carousel__slide').offsetWidth;

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
        
        if(current >= carousel_num-1)
        {
          obj.style.display = 'none';
          current = carousel_num-1;
        }
      };
    }

  })();

  arrow_right.style.display = '';
  arrow_left.style.display = 'none';
  
}
