

/**
 * Call with Current Continuation (call/cc) Basics
 * 
 * This file demonstrates the basic concepts of call/cc, a powerful control flow
 * construct that captures the current continuation and allows non-local returns.
 */

/**
 * Implementation of call/cc (call with current continuation)
 * @param {function} f - Function that receives the current continuation
 * @param {function} k - The current continuation
 * @returns {*} - The result of applying f to k
 */
function callcc(f, k)
{
  return f(k, k);
}

/**
 * Test function demonstrating basic call/cc usage
 * @param {function} k - Continuation function
 */
function test1(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      escapeK(42);  // First return value through the escape continuation
      nextK(1);     // Second return value through the next continuation
    }, 
    k
  );
}

test1( x => console.log("test1=", x) );
// test1= 42
// test1= 1


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
          return escapeK(sum); // 1+3=4
        }
        else
        {
          sum += n;
        }
      }
      return nextK(sum); // 1+3+5+7=16
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
          return nextK(sum);
        }
        else
        {
          const n = arr[idx];
          if (n > 3)
          {
            return escapeK(sum);
          }
          else
          {
            return loop(idx+1, sum+n);
          }
        }
      }
      loop(0, sum);
    },
    k
  );
}

test3( x => console.log("test3=", x) ); // 4

