/**
 * Test Suite for Continuation Concepts
 * 
 * This file contains tests and examples of continuation-related concepts,
 * including modern JavaScript approaches like Promises and async/await
 * which relate to continuation-passing style.
 */

var show = console.log;

/**
 * Asynchronous factorial function using async/await
 * This demonstrates how modern JavaScript's Promise-based async features
 * relate to continuation concepts
 * @param {number} n - The number to calculate factorial for
 * @returns {Promise<number>} - A promise that resolves to the factorial result
 */
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