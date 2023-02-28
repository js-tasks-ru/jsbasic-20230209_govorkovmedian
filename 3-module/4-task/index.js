function showSalary(users, age) {
  // ваш код...

  return users.filter((u)=>{return u.age <= age;}).map((u)=>{return u.name +', '+u.balance;}).join('\n');
}
