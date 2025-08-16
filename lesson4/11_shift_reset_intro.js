
/**
 * Introduction to Shift/Reset Delimited Continuations
 * 
 * This file introduces the concept of delimited continuations using the shift and reset
 * operators. These are more powerful control flow constructs than call/cc as they allow
 * capturing partial continuations rather than the entire continuation.
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
 * @param {function} thunk - The thunk function to execute within a delimited context
 */
function reset(thunk)
{
  try
  {
    thunk(x => x);
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
        k1( () => console.log("C"));
      }
    );
  }
);
console.log("E");
run();

// A
// B
// E
// C
