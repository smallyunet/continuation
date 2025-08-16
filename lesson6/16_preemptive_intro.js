/**
 * Introduction to Preemptive Coroutines
 * 
 * This file introduces the concept of preemptive multitasking using JavaScript's
 * event loop and setTimeout to implement cooperative-yet-preemptive task scheduling.
 */

/**
 * Queue of ready continuations waiting to be executed
 */
let ready = [];

/**
 * Runs all the tasks in the ready queue in a preemptive manner
 * Uses setTimeout with 0ms delay to yield to the event loop between tasks
 */
function run()
{
  function tick()
  {
    if (ready.length == 0) return;
    const k = ready.shift();
    setTimeout(
      () => 
      {
        k();
        tick();
      },
      0
    );
  }
  tick();
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

function shift(f)
{
  throw f;
}

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