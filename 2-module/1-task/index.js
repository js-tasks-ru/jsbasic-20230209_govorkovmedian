function sumSalary(salaries) {
  let sum = 0;
  
  for(let i in salaries){
      if(typeof salaries[i] === "number" && ![NaN, Infinity, -Infinity].includes(salaries[i]))
      {
          sum += salaries[i];
      }
  }
  
  return sum;
}
