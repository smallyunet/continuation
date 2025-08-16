/**
 * Advanced Call/cc Applications
 * 
 * This file demonstrates complex control flow patterns using call/cc,
 * including schedulers, cooperative multitasking, and more sophisticated examples.
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

function yieldCC(k)
{
  callcc(
    (escapeK, nextK) => 
    {
      ready.push(nextK);
      let next = ready.shift();
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



function taskA()
{
  console.log("task yield cc A0");
  yieldCC(() => console.log("task yield cc A1") );
  console.log("task yield cc A2");
}

function taskB()
{
  console.log("task yield cc B0");
  yieldCC(() => console.log("task yield cc B1"));
  console.log("task yield cc B2");
}

console.log("------");
// spawn(taskA);
// spawn(taskB);
// run();


console.log("------");
// function taskA()
// {
//   console.log("task yield cc A0");
//   yieldCC(
//     () => 
//     {
//       console.log("task yield cc A1");
//       yieldCC(() => console.log("task yield cc A2"));
//     }
//   );
// }

// function taskB()
// {
//   console.log("task yield cc B0");
//   yieldCC(
//     () => 
//     {
//       console.log("task yield cc B1");
//       yieldCC(() => console.log("task yield cc B2"));
//     }
//   );
// }
