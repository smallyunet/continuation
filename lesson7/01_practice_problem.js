/**
 * Practice Problems for Continuation-Passing Style (CPS)
 * 
 * This file contains practice exercises for implementing functions
 * in both traditional recursive style and CPS style.
 */

/**
 * Calculates the sum of integers from a to b, inclusive
 * @param {number} a - The starting number
 * @param {number} b - The ending number
 * @returns {number} - The sum of all integers from a to b
 */
function sumFrom(a, b)
{
  if (a == b) 
  {
    return a;
  }
  else
  {
    return b + sumFrom(a, b-1);
  }
}

console.log(sumFrom(1, 3));   // 6
console.log(sumFrom(2, 5));   // 14



/**
 * Practice implementation of sumFrom using CPS
 * (placeholder function - to be implemented by student)
 * @param {number} a - The starting number
 * @param {number} b - The ending number
 * @param {function} k - Continuation function that receives the result
 */
function sumFromCPS(a, b, k)
{
  // ____
}

/**
 * CPS version of the sumFrom function
 * @param {number} a - The starting number
 * @param {number} b - The ending number
 * @param {function} k - Continuation function that receives the result
 * @returns {*} - The result of applying the continuation
 */
function sumFromCPS(a, b, k)
{
  if (a == b)
  {
    return k(a);
  }
  else
  {
    return sumFromCPS(a, b-1, r => k(b+r));
  }
}

sumFromCPS(1, 3, x => console.log(x));   // 6
sumFromCPS(2, 5, x => console.log(x));   // 14


