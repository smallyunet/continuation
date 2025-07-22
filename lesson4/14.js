
const ready = [];

function run()
{
  while (ready.length > 0)
  {
    const k = ready.shift()
    k();
  }
}

function reset(thunk)
{
  try
  {
    thunk( x => ready.push(x) );
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

reset(
  k =>
  {
    console.log("A");
    shift(
      k1 =>
      {
        console.log("B");
        k( () => console.log("E") );
        k1( () => console.log("C"));
        console.log("D");
      }
    );
  }
)
run();

