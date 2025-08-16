/**
 * Coroutine Examples
 * 
 * This file provides practical examples of coroutines implemented with
 * shift/reset delimited continuations to demonstrate their utility.
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
 * Spawns a new example coroutine
 * @param {function} thunk - The coroutine function to spawn
{
  ready.push(thunk);
}


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


let longTask = makeCPSTask(20);
let shortTask = makeCPSTask(2);


spawn(longTask);
spawn(shortTask);
run();


