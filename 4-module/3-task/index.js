function highlight(table) {
  // ваш код...

  [...table.rows].map(work);
}


function work(row)
{
  putAvailability(row);

  putSex(row);

  putAge(row);
}

function putAvailability(row)
{
  let d = row.cells[3].getAttribute('data-available'); 

  if(d == undefined)
    row.hidden = true;
  else if (['true', 'false'].includes(d))
    (d === "true") ? row.classList.add('available') : row.classList.add('unavailable');

}

function putSex(row)
{
  let d = row.cells[2].innerText; 

  if(['m','f'].includes(d))
    (d === "m") ? row.classList.add('male') : row.classList.add('female');

}

function putAge(row)
{
  let d = parseInt(row.cells[1].innerText); 

  if(d && d<18)
    row.style = "text-decoration: line-through";

}