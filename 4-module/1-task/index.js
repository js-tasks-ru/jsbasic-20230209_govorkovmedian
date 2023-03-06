function makeFriendsList(friends) {
  // ваш код...

  let ul = document.createElement('ul');

  ul.append(...friends.map(obj => {let li = document.createElement('li'); li.innerText = `${obj.firstName} ${obj.lastName}`; return li;}));

  return ul;
}
