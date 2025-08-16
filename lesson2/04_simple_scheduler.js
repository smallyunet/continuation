
/**
 * Simple Task Scheduler Implementation
 * 
 * This file demonstrates a basic task scheduler that maintains a queue of functions
 * and executes them in order. This is a fundamental concept for understanding 
 * cooperative multitasking and continuations.
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


ready.push( () => console.log(1) );
ready.push( () => console.log(2) );
ready.push( () => console.log(3) );
run();



/**
 * Example task A that prints two messages
 */
function taskA()
{
  console.log("task A0");
  console.log("task A1");
}

/**
 * Example task B that prints two messages
 */
function taskB()
{
  console.log("task B0");
  console.log("task B1");
}

ready.push(taskA);
ready.push(taskB);
run();
// task A1
// task A2
// task B1
// task B2



function yieldCPS(k)
{
  ready.push(k);              // 把当前步骤的执行环境存起来
  const next = ready.shift(); // 去执行队列头部的其他任务
  next();
}

yieldCPS( () => console.log("yield cps") );
run();  // yield cps



function taskAYield(yieldFn)
{
  console.log("task yield A0");
  yieldFn( () => console.log("task yield A1") );
}

ready.push( () => taskAYield(yieldCPS) );
run(); 


function taskBYield(yieldFn)
{
  console.log("task yield B0");
  yieldFn( () => console.log("task yield B1") );
}

ready.push( () => taskAYield(yieldCPS) );
ready.push( () => taskBYield(yieldCPS) );
run();
// task yield A0
// task yield B0
// task yield A1
// task yield B1





function taskCYield(yieldFn)
{
  console.log("task yield C0");
  yieldFn( () => console.log("task yield C1") );
  console.log("task yield C2");
}

ready.push( () => taskCYield(yieldCPS) );
run(); 




function spawn(thunk)
{
  ready.push( () => thunk(yieldCPS) );
}


spawn(taskAYield);
spawn(taskBYield);
run();




function sleep(ms, yieldFn, k)
{
  setTimeout(
    () => 
      {
        ready.push(k);
        run();
      }, 
    ms);
  return yieldFn(() => {});
}

function taskDYield(yieldFn)
{
  console.log("task yield D0");
  return sleep(5000, yieldFn, () => console.log("task yield D1") );
}

spawn(taskDYield);
run();







