

function callcc(f, k)
{
  try
  {
    return f(
      v => { throw { tag: "callcc", value: v } },
      k
    )
  }
  catch (e)
  {
    if (e.tag == "callcc") return k(e.value);
    throw e;
  }
}


let savedK = null;

function entry(k)
{
  callcc(
    (escapeK, nextK) =>
    {
      savedK = escapeK;
      return nextK(0);
    },
    k
  );
}

entry( x => console.log("entry=", x) ); 
// entry= 0

console.log(savedK.toString());
// v => { throw { tag: "callcc", value: v } }


function run(f, k)
{
  try
  {
    return f();
  }
  catch (e)
  {
    console.log(e);
  }
}

run( () => savedK("1") );
run( () => savedK("2") );



let savedK_test = v => { throw { tag: "callcc", value: v } };
run( () => savedK_test("1") );
run( () => savedK_test("2") );



let savedK_foo = null;

function foo()
{
  let counter = 0;
  callcc(
    (e, k) =>
    {
      savedK_foo = k;
      return k();
    },
    () =>
    {
      counter++;
      console.log("counter=", counter);
    }
  )
}

foo();         // counter= 1
savedK_foo();  // counter= 2
savedK_foo();  // counter= 3


