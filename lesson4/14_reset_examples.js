
/**
 * Reset Examples
 * 
 * This file demonstrates the use of the reset operator in delimited continuations.
 * Reset delimits the scope of continuations captured by shift operations.
 */

/**
 * Queue of ready continuations waiting to be executed
 */
const ready = [];

/**
 * Runs all the tasks in the ready queue until the queue is empty
 */
function run()
{
  while (ready.length > 0)
  {
    const k = ready.shift()
    k();
  }
}

/**
 * Reset operator - delimits the scope of the continuation captured by shift
 * This version pushes the result to the ready queue
 * @param {function} thunk - The thunk function to execute within a delimited context
 */
function reset(thunk)
{
  try
  {
    thunk( x => ready.push(x) );
  }
  catch (f)
  {
    f( v => ready.push(v) );
  }
}

/**
 * Shift operator - captures the current delimited continuation up to the nearest reset
 * @param {function} f - The function to apply to the captured continuation
 */
function shift(f)
{
  throw f;
}

reset(
  k =>
  {
    console.log("A");
    shift(
      k1 =>
      {
        console.log("B");
        k( () => console.log("E") );
        k1( () => console.log("C"));
        console.log("D");
      }
    );
  }
)
run();

