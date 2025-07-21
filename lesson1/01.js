
let defaultDepth = new Error().stack.split("\n").length;  // 8
console.log(defaultDepth); // 8

function fact(n)
{
  const depth = new Error().stack.split("\n").length - defaultDepth;
  console.log(`Current stack depth: ${depth}=========`, new Error().stack);
  if (n == 0)
    return [1, depth];
  else
  {
    const [r, maxDepth] = fact(n - 1);
    return [n * r, Math.max(depth, maxDepth)];
  }
}

console.log(fact(0)); // [1, 1]
console.log(fact(1)); // [1, 2]
console.log(fact(5)); // [120, 3]


