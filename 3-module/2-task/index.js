function filterRange(arr, a, b) {
  
  // if we know for sure NaN can not occur in our array
  return arr.map((elem)=> (elem >= a) && (elem <= b) ? elem : NaN).filter((e)=> !isNaN(e));

  /* or what is the same

  let new_arr = [];
  for(let i=0; i<arr.length; i++)
  {
    if((arr[i] >= a) && (arr[i] <= b))
      new_arr.push(arr[i]);
  }
  return new_arr;
  */
}
