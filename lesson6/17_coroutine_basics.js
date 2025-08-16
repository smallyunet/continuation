/**
 * Coroutine Basics
 * 
 * This file demonstrates the fundamental concepts of coroutines
 * using JavaScript and the shift/reset delimited continuation operators.
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
 * Spawns a new coroutine
 * @param {function} thunk - The coroutine function to spawn
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
          k1( 
            () => 
            {
              console.log("task shift reset A1");
              k1( () => console.log("task shift reset A2"));
            }
          );
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
          k1( 
            () => 
            {
              console.log("task shift reset B1");
              k1( () => console.log("task shift reset B2"));
            }
          );
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



function makeCPSTask(n)
{
  return function task()
  {
    reset(
      k =>
      {
        shift(
          k1 =>
          {
            console.log(`task shift reset 0/${n}`);
            function step(i)
            {
              if (i < n)
              {
                k1( 
                  () => 
                  {
                    console.log(`task shift reset ${i + 1}/${n}`);
                    step(i + 1);
                  }
                );
              }
            }
            step(0);
          }
        );
      }
    );
  }
}

// console.log( makeCPSTask(3).toString() );
spawn(makeCPSTask(3));
run();
// task shift reset 0/3
// task shift reset 1/3
// task shift reset 2/3
// task shift reset 3/3

spawn(makeCPSTask(1000));
run();
