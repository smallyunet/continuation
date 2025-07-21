

function add(a, b, k)
{
  k(a+b);
}

add(1, 2, x => console.log(x) )




function add(a, b, k)
{
  k(a+b);
}

function main(k)
{
  add(1, 2, k);
}

main(x => console.log(x) )





