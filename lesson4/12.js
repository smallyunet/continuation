

function callcc(f, k)
{
  try
  {
    f(v => { throw v }, k);
  }
  catch (e)
  {
    k(e);
  }
}

function test1(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      console.log("A");
      nextK("B");
      console.log("C");
      escapeK("D");
      console.log("E");
    }, 
    k
  );
}

test1( x => console.log(x) );
// A
// B
// C
// D

