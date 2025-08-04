function rps(n) {
  let n1 = Math.floor(Math.random() * 3);
  console.log(n1, "n1");
  if (n === n1) return 2;

  if (n === 0) {
    if (n1 === 1) return 0;
    return 1;
  }
  if (n1 === 0) {
    if (n === 1) return 1;
    return 0;
  }

  if (n > n1) return 1;
  return 0;
}

let input = prompt();
console.log(rps(input));
