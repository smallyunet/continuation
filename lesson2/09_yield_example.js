/**
 * Yield Example Using Continuation-Passing Style
 * 
 * This file demonstrates how to implement a simple cooperative multitasking system
 * using continuations to simulate the yield behavior found in generators.
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
 * Implements the yield functionality using CPS
 * @param {function} k - The continuation to be executed after yielding
 */
function yieldCPS(k)
{
  ready.push(k);
  const next = ready.shift();
  next();
}

/**
 * Example task A that yields execution after printing a message
 * @param {function} yieldFn - The yield function to use for cooperative multitasking
 */
function taskA(yieldFn)
{
  console.log("task yield A0");
  yieldFn( () => console.log("task yield A1") );
}

/**
 * Example task B that yields execution after printing a message
 * @param {function} yieldFn - The yield function to use for cooperative multitasking
 */
function taskB(yieldFn)
{
  console.log("task yield B0");
  yieldFn( () => console.log("task yield B1") );
}

function spawn(thunk)
{
  ready.push( () => thunk(yieldCPS) );
}

spawn(taskA);
spawn(taskB);
run();

