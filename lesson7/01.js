function sumFrom(a, b)
{
  if (a == b) 
  {
    return a;
  }
  else
  {
    return b + sumFrom(a, b-1);
  }
}

console.log(sumFrom(1, 3));   // 6
console.log(sumFrom(2, 5));   // 14



function sumFromCPS(a, b, k)
{
  // ____
}

function sumFromCPS(a, b, k)
{
  if (a == b)
  {
    return k(a);
  }
  else
  {
    return sumFromCPS(a, b-1, r => k(b+r));
  }
}

sumFromCPS(1, 3, x => console.log(x));   // 6
sumFromCPS(2, 5, x => console.log(x));   // 14


