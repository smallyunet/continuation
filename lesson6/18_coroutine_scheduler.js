/**
 * Coroutine Scheduler Implementation
 * 
 * This file demonstrates a more complete coroutine scheduler implementation
 * using shift/reset operators for cooperative multitasking.
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
 * Spawns a new coroutine in the scheduler
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
            console.log(`task 0/${n}`);
            function step(i)
            {
              if (i < n)
              {
                k1( 
                  () => 
                  {
                    console.log(`task ${i + 1}/${n}`);
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


let shortTask = makeCPSTask(2);

function makeLongTask(n)
{
  return function task()
  {
    reset(
      k =>
      {
        shift(k1 => {
          console.log("block task start");
          for (let i = 0; i < n; i++) {
            console.log("busy", i);
          }
          console.log("block task end");
        });
      }
    );
  }
}

let longTask = makeLongTask(10);

spawn(longTask);
spawn(shortTask);
run();


