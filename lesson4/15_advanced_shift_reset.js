/**
 * Advanced Shift/Reset Applications
 * 
 * This file demonstrates advanced usage of shift and reset operators
 * to implement complex control flow patterns including cooperative multitasking.
 */

/**
 * Queue of ready continuations waiting to be executed
 */
let ready = [];

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

/**
 * Spawns a new task to be executed cooperatively
 * @param {function} thunk - The task function to spawn
 */
function spawn(thunk)
{
  ready.push(thunk);
}

function taskA()
{
  reset(
    k =>
    {
      shift(
        k1 =>
        {
          console.log("task shift reset A0");
          k1( () => console.log("task shift reset A1"));
        }
      );
    }
  );
}

function taskB()
{
  reset(
    k =>
    {
      shift(
        k1 =>
        {
          console.log("task shift reset B0");
          k1( () => console.log("task shift reset B1"));
        }
      );
    }
  );
}

spawn(taskA);
spawn(taskB);
run();

// task shift reset A0
// task shift reset B0
// task shift reset A1
// task shift reset B1