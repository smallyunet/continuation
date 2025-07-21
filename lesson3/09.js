let ready = [];

function run()
{
  while (ready.length > 0)
  {
    const k = ready.shift()
    k();
  }
}

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

