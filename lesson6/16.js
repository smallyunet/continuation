let ready = [];

function run()
{
  function tick()
  {
    if (ready.length == 0) return;
    const k = ready.shift();
    setTimeout(
      () => 
      {
        k();
        tick();
      },
      0
    );
  }
  tick();
}

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

function taskA()
{
  reset(
    k =>
    {
      shift(
        k1 =>
        {
          console.log("task shift reset A0");
          k1( () => console.log("task shift reset A1"));
        }
      );
    }
  );
}

function taskB()
{
  reset(
    k =>
    {
      shift(
        k1 =>
        {
          console.log("task shift reset B0");
          k1( () => console.log("task shift reset B1"));
        }
      );
    }
  );
}

spawn(taskA);
spawn(taskB);
run();