let ready = [];

function run()
{
  while (ready.length > 0)
  {
    const k = ready.shift()
    k();
  }
}

function yieldCPS(k)
{
  ready.push(k);
  const next = ready.shift();
  next();
}

function taskA(yieldFn)
{
  console.log("task yield A0");
  yieldFn( () => console.log("task yield A1") );
}

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

