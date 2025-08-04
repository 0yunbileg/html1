function printPyramid1(n) {
  for (let i = 0; i < n; i++) {
    console.log(" ".repeat(n - i), "* ".repeat(i + 1));
  }
}

function printPyramid(n) {
  for (let i = 1; i <= n; i++) {
    console.log(" ".repeat(n - i), "*".repeat(2 * i - 1));
  }
}

printPyramid(12);
printPyramid1(12);
