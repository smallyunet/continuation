
// ------------ fact -----------

function fact(n)
{
  if (n === 0) 
  {
    return 1;
  }
  else
  {
    return n * fact(n - 1);
  }
}

console.log("fact1=", fact(1)); // 1
console.log("fact3=", fact(3)); // 6
console.log("fact5=", fact(5)); // 120


function factTail(n, acc)
{
  if (n == 0)
  {
    return acc;
  }
  else
  {
    return factTail(n-1, acc*n);
  }
}

console.log("factTail1=", factTail(1, 1)); // 1
console.log("factTail3=", factTail(3, 1)); // 6
console.log("factTail5=", factTail(5, 1)); // 120


function factTailCPS(n, acc, k)
{
  if (n == 0)
  {
    return k(acc);
  }
  else
  {
    return factTailCPS(n-1, acc*n, k);
  }
}

factTailCPS( 1, 1, x => console.log("factTailCPS1=", x) );
factTailCPS( 3, 1, x => console.log("factTailCPS1=", x) );
factTailCPS( 5, 1, x => console.log("factTailCPS1=", x) );


function factCPS(n, k)
{
  if (n == 0)
  {
    return k(1);
  }
  else
  {
    return factCPS(n-1, r => k(n * r));
  }
}

let factCPS1 = factCPS(0, x => x);
console.log("factCPS1=", factCPS1); // 0

let factCPS2 = factCPS(2, x => x);
console.log("factCPS2=", factCPS2); // 2

// n=2, k=x=>x, return factCPS(1, r => k(2 * r));
  // n=1, k=r=>(x=>x)(2*r), return factCPS(0, r => k(1 * r));
    // n=0, k=r=>(r=>(x=>x)(2*r)(1*r)), return k(1);
      // k(1) = r=>(x=>x)(2*r)(1*1)
      //      = (x=>x)(2)
      //      = 2

let factCPS3 = factCPS(3, x => x);
console.log("factCPS3=", factCPS3); // 6

let factCPS5 = factCPS(5, x => x);
console.log("factCPS5=", factCPS5); // 120


// -------------- fib -------------
function fib(n)
{
  if (n == 0)
  {
    return 0;
  }
  else if (n == 1)
  {
    return 1;
  }
  else 
  {
    return fib(n-1) + fib(n-2);
  }
}

console.log("fib(2)=", fib(2)); // 1
console.log("fib(5)=", fib(5)); // 5

function fibCPS(n, k)
{
  if (n == 0)
  {
    return k(0);
  }
  else if (n == 1)
  {
    return k(1);
  }
  else
  {
    return fibCPS(n-1, r1 => fibCPS(n-2, r2=>k(r1+r2)) );
  }
}

let fibCPS1 = fibCPS(1, x=>x);
console.log("fibCPS1=", fibCPS1); // 1+0=1

let fibCPS2 = fibCPS(2, x=>x);
console.log("fibCPS2=", fibCPS2); // 1+0=1

let fibCPS3 = fibCPS(3, x=>x);
console.log("fibCPS3=", fibCPS3); // 1+1=2

// n=3, k=x=>x, 
       // return fibCPS(2, r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) );
// n=2, k= r1 => fibCPS(1, r2=>(x=>x)(r1+r2)), 
       // return fibCPS(1, r1 => fibCPS(0, r2 => ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) )(r1+r2)) );
// n=1, k= r1 => fibCPS(0, r2 => ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) )(r1+r2)), 
       // return k(1)
       // return ( r1 => fibCPS(0, r2 => ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) )(r1+r2)) )(1)
       // return fibCPS(0, r2 => ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) )(1+r2))
          // n=0, k= r2 => ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) )(1+r2)
              // return k(0)
              // return ( r2 => ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) )(1+r2) )(0)
              // return ( r1 => fibCPS(1, r2=>(x=>x)(r1+r2)) ) (1+0)
              // return fibCPS(1, r2=>(x=>x)(1+r2))
                  // n=1, k = r2=>(x=>x)(1+r2)
                  // return k(1)
                  // return (x=>x)(1+1)
                  // return 2

let fibCPS4 = fibCPS(4, x=>x);
console.log("fibCPS4=", fibCPS4); // 3

let fibCPS5 = fibCPS(5, x=>x);
console.log("fibCPS5=", fibCPS5); // 5