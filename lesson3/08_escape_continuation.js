

/**
 * Escape Continuations with call/cc
 * 
 * This file demonstrates how to save and reuse continuations,
 * allowing for non-local returns and complex control flow patterns.
 */

/**
 * Implementation of call/cc using exceptions for control flow
 * @param {function} f - Function that receives escape and next continuations
 * @param {function} k - The current continuation
 * @returns {*} - The result of the continuation
 */
function callcc(f, k)
{
  try
  {
    return f(v => { throw v }, k);
  }
  catch (e)
  {
    return k(e);
  }
}

/**
 * Global variable to store a continuation for later use
 */
let savedK = null;

/**
 * Function that captures and saves a continuation
 * @param {function} k - The continuation to save and use
 */
function entry(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      savedK = escapeK;  // Save the escape continuation for later use
      nextK(0);          // Continue normal execution
    },
    k
  );
}

entry( x => console.log("entry=", x) ); 
// entry= 0

console.log(savedK.toString());
// v => v => { throw v }


function run(f, k)
{
  try
  {
    f();
  }
  catch (e)
  {
    console.log(e);
  }
}

run( () => savedK("1") );  // 1
run( () => savedK("2") );  // 2



let savedK_test = v => { throw v };
run( () => savedK_test("1") );  // 1
run( () => savedK_test("2") );  // 2



let savedK_foo = null;

function foo()
{
  let counter = 0;
  callcc(
    (e, k) =>
    {
      savedK_foo = k;
      return k();
    },
    () =>
    {
      counter++;
      console.log("counter=", counter);
    }
  )
}

foo();         // counter= 1
savedK_foo();  // counter= 2
savedK_foo();  // counter= 3


