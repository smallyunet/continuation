/**
 * Advanced Preemptive Scheduling
 * 
 * This file demonstrates a more sophisticated preemptive scheduler
 * that allocates specific time slices to each task and uses the JavaScript
 * event loop to implement time-based preemption.
 */

/**
 * Queue of ready continuations waiting to be executed
 */
let ready = [];

console.log(performance.now());

/**
 * Runs tasks for a specific time slice before yielding to other tasks
 * @param {number} timeSlice - The maximum time (in ms) a task can run before being preempted
 */
function run(timeSlice = 1) 
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

function makeLongTask(n)
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
            function chunk() 
            {
              const end = Math.min(i + 1e7, n);
              for (; i < end; i++) ;          // 纯计算
              if (i < n) k1(chunk);           // 让出控制权
              else console.log('block task end');
            }
            chunk();
          }
        );
      }
    );
  }
}

let longTask = makeLongTask(5e7);
let shortTask = makeCPSTask(2);

spawn(longTask);
spawn(shortTask);
run();

// block task start
// task 0/2
// task 1/2
// block task end
// task 2/2
