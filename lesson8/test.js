var show = console.log;

async function fact(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * (await fact(n - 1));
  }
}

fact(5).then(show); // 120
fact(2).then(show); // 2
fact(3).then(show); // 6
fact(1).then(show); // 1
fact(4).then(show); // 24


// 1
// 2
// 6
// 24
// 120