

/**
 * Introduction to Continuation-Passing Style (CPS)
 * 
 * This file demonstrates the basics of CPS by comparing traditional recursive functions
 * with their CPS equivalents. CPS is a programming style where control is passed
 * explicitly in the form of a continuation.
 */

/**
 * Traditional recursive factorial function
 * @param {number} n - The number to calculate factorial for
 * @returns {number} - The factorial result
 */
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

console.log(fact(5)); // 120



/**
 * CPS version of the factorial function
 * @param {number} n - The number to calculate factorial for
 * @param {function} k - Continuation function that receives the result
 * @returns {*} - The result of applying the continuation
 */
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

let v1 = factCPS(0, x => x);
console.log("v1=", v1); // 0

let v2 = factCPS(5, x => x);
console.log("v2=", v2); // 120

let v3 = factCPS(2, x => x);
console.log("v3=", v3); // 2

// n=2, k=x=>x, return factCPS(1, r => k(2 * r));
  // n=1, k=r=>(x=>x)(2*r), return factCPS(0, r => k(1 * r));
    // n=0, k=r=>(r=>(x=>x)(2*r)(1*r)), return k(1);
      // k(1) = r=>(x=>x)(2*r)(1*1)
           // = (x=>x)(2)
           // = 2


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

console.log("fib(2)=", fib(2));
console.log("fib(5)=", fib(5));

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

let f1 = fibCPS(1, x=>x);
console.log("f1=", f1); // 1+0

let f2 = fibCPS(2, x=>x);
console.log("f2=", f2); // 2+1

let f3 = fibCPS(3, x=>x);
console.log("f3=", f3);

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

let f4 = fibCPS(4, x=>x);
console.log("f4=", f4);

let f5 = fibCPS(5, x=>x);
console.log("f5=", f5);