

/**
 * JavaScript Generator Basics
 * 
 * This file demonstrates the basics of JavaScript generators and their relationship
 * with continuations. It shows simple examples of continuation-style functions
 * and how they can be used in a sequential flow.
 */

/**
 * Adds two numbers and passes the result to a continuation
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {function} k - Continuation function that receives the sum
 */
function add(a, b, k)
{
  k(a+b);
}

add(1, 2, x => console.log(x) )




/**
 * Another version of add function with the same behavior
 */
function add(a, b, k)
{
  k(a+b);
}

/**
 * Main function that demonstrates composition of continuation-style functions
 * @param {function} k - Continuation function that receives the final result
 */
function main(k)
{
  add(1, 2, k);
}

main(x => console.log(x) )





