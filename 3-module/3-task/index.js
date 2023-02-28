function camelize(str) {

  // assuming each word consists of at least one char
  let capitalize = (s) => {return s[0].toLocaleUpperCase() + s.slice(1);},
    arr = str.split('-');

  return arr[0] + arr.slice(1).map(capitalize).join('');
}
