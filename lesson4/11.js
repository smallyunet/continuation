
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

reset(
  k =>
  {
    console.log("A");
    shift(
      k1 =>
      {
        console.log("B");
        k1( () => console.log("C"));
      }
    );
  }
);
console.log("E");
run();

// A
// B
// E
// C
