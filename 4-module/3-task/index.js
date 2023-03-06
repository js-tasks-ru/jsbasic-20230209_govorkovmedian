function highlight(table) {
  // ваш код...

  [...table.getElementsByTagName('tr')].map(work);
}


function work(row)
{
  putAvailability(row);

  putSex(row);

  putAge(row);
}

function putAvailability(row)
{
  let d = row.children[3].getAttribute('data-available'); 

  if(d == undefined)
    row.hidden = true;
  else if (['true', 'false'].includes(d))
    (d === "true") ? row.classList.add('available') : row.classList.add('unavailable');

}

function putSex(row)
{
  let d = row.children[2].innerText; 

  if(['m','f'].includes(d))
    (d === "m") ? row.classList.add('male') : row.classList.add('female');

}

function putAge(row)
{
  let d = parseInt(row.children[1].innerText); 

  if(d && d<18)
    row.style = "text-decoration: line-through";

}