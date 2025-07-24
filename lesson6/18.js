let ready = [];

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

function spawn(thunk)
{
  ready.push(thunk);
}


function makeCPSTask(n)
{
  return function task()
  {
    reset(
      k =>
      {
        shift(
          k1 =>
          {
            console.log(`task 0/${n}`);
            function step(i)
            {
              if (i < n)
              {
                k1( 
                  () => 
                  {
                    console.log(`task ${i + 1}/${n}`);
                    step(i + 1);
                  }
                );
              }
            }
            step(0);
          }
        );
      }
    );
  }
}


let shortTask = makeCPSTask(2);

function makeLongTask(n)
{
  return function task()
  {
    reset(
      k =>
      {
        shift(k1 => {
          console.log("block task start");
          for (let i = 0; i < n; i++) {
            console.log("busy", i);
          }
          console.log("block task end");
        });
      }
    );
  }
}

let longTask = makeLongTask(10);

spawn(longTask);
spawn(shortTask);
run();


