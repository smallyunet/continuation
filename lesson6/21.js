let ready = [];

function run()
{
  while (ready.length > 0)
  {
    const k = ready.shift()
    k();
  }
}

function run2(timeSlice) 
{
  function tick() 
  {
    const sliceStart = performance.now();

    while (ready.length > 0 && performance.now() - sliceStart < timeSlice) 
    {
      const k = ready.shift();
      k();
    }

    if (ready.length > 0) setTimeout(tick, 0);
  }

  setTimeout(tick, 0);
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

function makeLongTask(n, chunk)
{
  return function task()
  {
    reset(
      k =>
      {
        shift(
          k1 => 
          {
            console.log("block task start");
            let i = 0;
            function chunkLoop() 
            {
              const end = Math.min(i + chunk, n);
              for (; i < end; i++) ;          // 纯计算
              if (i < n) k1(chunkLoop);       // 让出控制权
              else console.log('block task end');
            }
            chunkLoop();
          }
        );
      }
    );
  }
}

let longTask = makeLongTask(5e8, 5e7);
let shortTask = makeCPSTask(2);

spawn(longTask);
spawn(shortTask);

setTimeout(() => console.log('>>> TIMER fired'), 100);

// run();
run2(1);

