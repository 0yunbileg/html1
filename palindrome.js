function isPalindrome(n) {
  let n1 = n.toString().split("").reverse().join("");
  console.log(n == n1);
}

isPalindrome(12351);
