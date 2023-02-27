function getMinMax(str) {
  let arr = str.split(' ').map(parseFloat).filter((elem) => !isNaN(elem)),
      res = {
        min: arr[0],
        max: arr[0]
      },
      sum = (res, elem) => { 
          res.min = res.min>elem ? elem : res.min; 
          res.max = res.max<elem ? elem : res.max; 

          return res;
        };


  return arr.slice(1).reduce(sum, res);
}
