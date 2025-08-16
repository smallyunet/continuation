/**
 * Complete Coroutine Implementation
 * 
 * This file provides a comprehensive implementation of a coroutine system
 * with both cooperative and preemptive scheduling options.
 */

/**
 * Queue of ready continuations waiting to be executed
 */
let ready = [];

/**
 * Standard cooperative scheduler that runs tasks until they yield
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
 * Preemptive scheduler that allocates time slices to tasks
 * @param {number} timeSlice - The maximum time (in ms) a task can run before being preempted
 */
function run2(timeSlice) 
{
  function tick() 
  {
    const sliceStart = performance.now();

    // Run tasks until the time slice is used up
    while (ready.length > 0 && performance.now() - sliceStart < timeSlice) 
    {
      const k = ready.shift();
      k();
    }

    // If there are more tasks, schedule another tick
    if (ready.length > 0) setTimeout(tick, 0);
  }

  setTimeout(tick, 0);
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

function makeLongTask(n, chunk)
{
  return function task()
  {
    reset(
      k =>
      {
        shift(
          k1 => 
          {
            console.log("block task start");
            let i = 0;
            function chunkLoop() 
            {
              const end = Math.min(i + chunk, n);
              for (; i < end; i++) ;          // 纯计算
              if (i < n) k1(chunkLoop);       // 让出控制权
              else console.log('block task end');
            }
            chunkLoop();
          }
        );
      }
    );
  }
}

let longTask = makeLongTask(5e8, 5e7);
let shortTask = makeCPSTask(2);

spawn(longTask);
spawn(shortTask);

setTimeout(() => console.log('>>> TIMER fired'), 100);

// run();
run2(1);

