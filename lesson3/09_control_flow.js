/**
 * Control Flow with call/cc
 * 
 * This file demonstrates how to implement advanced control flow mechanisms
 * using call/cc, including a cooperative multitasking system similar to generators.
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
 * Implementation of call/cc using exceptions for control flow
 * @param {function} f - Function that receives escape and next continuations
 * @param {function} k - The current continuation
 * @returns {*} - The result of the continuation
 */
function callcc(f, k)
{
  try
  {
    return f(v => { throw v }, k);
  }
  catch (e)
  {
    return k(e);
  }
}

/**
 * Implements a yield functionality using call/cc
 * @param {function} k - The current continuation
 */
function yieldCC(k)
{
  callcc(
    (escapeK, nextK) => 
    {
      ready.push(nextK);  // Add the current continuation to the queue
      let next = ready.shift();  // Get the next continuation to execute
      next();
    },
    k
  );
}

function spawn(thunk)
{
  ready.push(thunk);
}

function taskA()
{
  console.log("task call cc A0");
  yieldCC(() => console.log("task call cc A1") );
}

function taskB()
{
  console.log("task call cc B0");
  yieldCC(() => console.log("task call cc B1"));
}


spawn(taskA);
spawn(taskB);
run();

