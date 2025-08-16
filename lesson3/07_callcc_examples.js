

/**
 * Advanced Call/cc Examples
 * 
 * This file contains multiple implementations of call/cc (Call with Current Continuation)
 * to demonstrate different approaches and applications of this control flow concept.
 */

/**
 * Implementation of call/cc using tagged exceptions for control flow
 * @param {function} f - Function that receives escape and next continuations
 * @param {function} k - The current continuation
 * @returns {*} - The result of the continuation
 */
function callcc(f, k)
{
  try
  {
    return f(
      v => { throw { tag: "callcc", value: v } },  // Escape continuation
      k  // Next continuation
    )
  }
  catch (e)
  {
    if (e.tag == "callcc") return k(e.value);
    throw e;
  }
}

/**
 * Simplified implementation of call/cc using direct exceptions
 * @param {function} f - Function that receives escape and next continuations
 * @param {function} k - The current continuation
 */
function callcc(f, k)
{
  try
  {
    f(v => { throw v }, k);  // Escape continuation throws the value directly
  }
  catch (e)
  {
    k(e);  // Next continuation receives the thrown value
  }
}


function test1(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      escapeK(42);
      nextK(1);
    }, 
    k
  );
}

test1( x => console.log("test1=", x) );
// test1= 42


function test2(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      let sum = 0
      let arr = [1, 3, 5, 7];
      for (const n of arr)
      {
        if (n > 3)
        {
          escapeK(sum); // 1+3=4
        }
        else
        {
          sum += n;
        }
      }
      nextK(sum); // 1+3+5+7=16
    },
    k
  );
}

test2( x => console.log("test2=", x) ); // 4





function test3(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      let sum = 0;
      let arr = [1, 3, 5, 7];
      function loop(idx, sum)
      {
        if (idx == arr.length)
        {
          nextK(sum)
        }
        else
        {
          const n = arr[idx];
          if (n > 3)
          {
            escapeK(sum)
          }
          else
          {
            loop(idx+1, sum+n);
          }
        }
      }
      loop(0, sum);
    },
    k
  );
}

test3( x => console.log("test3=", x) ); // 4

