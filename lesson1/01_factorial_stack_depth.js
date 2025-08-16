
/**
 * Factorial Stack Depth Demonstration
 * 
 * This file demonstrates measuring the stack depth during recursive function execution.
 * It calculates factorial while tracking the maximum depth of the call stack.
 */

let defaultDepth = new Error().stack.split("\n").length;  // 8
console.log(defaultDepth); // 8

/**
 * Recursive factorial function that also measures and returns the stack depth
 * @param {number} n - The number to calculate factorial for
 * @returns {Array} - A tuple containing [factorial result, maximum stack depth]
 */
function fact(n)
{
  const depth = new Error().stack.split("\n").length - defaultDepth;
  console.log(`Current stack depth: ${depth}=========`, new Error().stack);
  if (n == 0)
    return [1, depth];
  else
  {
    const [r, maxDepth] = fact(n - 1);
    return [n * r, Math.max(depth, maxDepth)];
  }
}

console.log(fact(0)); // [1, 1]
console.log(fact(1)); // [1, 2]
console.log(fact(5)); // [120, 3]


