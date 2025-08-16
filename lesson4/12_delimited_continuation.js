

/**
 * Delimited Continuations
 * 
 * This file demonstrates the concept of delimited continuations
 * and compares them with traditional call/cc implementations.
 */

/**
 * Implementation of call/cc using exceptions for control flow
 * @param {function} f - Function that receives escape and next continuations
 * @param {function} k - The current continuation
 */
function callcc(f, k)
{
  try
  {
    f(v => { throw v }, k);
  }
  catch (e)
  {
    k(e);
  }
}

/**
 * Test function demonstrating continuation behavior
 * This shows how both normal and escape continuations affect control flow
 * @param {function} k - The continuation to pass the result to
 */
function test1(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      console.log("A");
      nextK("B");        // Continue normal execution with value "B"
      console.log("C");  // This will still be executed
      escapeK("D");      // Escape with value "D"
      console.log("E");  // This will never be executed
    }, 
    k
  );
}

test1( x => console.log(x) );
// A
// B
// C
// D

