function callcc(f, k_outer) {
  try {
    return f(
      v => { throw { tag: "callcc", value: v }; },
      k_outer
    );
  } catch (e) {
    if (e.tag === "callcc") return k_outer(e.value);
    throw e;
  }
}

let savedK = null;

/* -------- entry -------- */
function entry(k) {
  let counter = 0;

  function k_outer(v) {              // ← 把 counter++ 包进来
    console.log("➡️  entry k =", v);
    counter++;
    console.log("🧮  counter++ ->", counter);
    k(v);
  }

  callcc((escapeK, nextK) => {
    savedK = escapeK;                // 保存 multi-shot continuation
    console.log("🏷  拍完快照, counter =", counter);
    return nextK("initial");
  }, k_outer);
}

/* -------- run -------- */
function run(thunk, k) {
  return callcc((escapeK, nextK) => {
    try { return thunk(); }
    catch (e) {
      if (e.tag === "callcc") return nextK(e.value);
      throw e;
    }
  }, k);
}

/* ========== DEMO ========== */
entry(v => console.log("🔗 外层收到 ->", v));
console.log("\n--- 多次调用 savedK ---\n");

run(() => savedK("A"), v => console.log("again =", v));
console.log("---");
run(() => savedK("B"), v => console.log("again =", v));




callcc((k, next) => { savedK = k; return next(0); },
       v => console.log("outer-1", v));   // 打印 outer-1 0

callcc((_, next) => savedK(1),           // 触发第一次回溯
       v => console.log("outer-2", v));   // 打印 outer-2 1

callcc((_, next) => savedK(2),           // 再触发一次
       v => console.log("outer-3", v));   // 打印 outer-3 2

       


function demo(label) {
  callcc((escapeK, nextK) => {
    // 立刻早退
    escapeK(label + " -> early");
    // 如果没有早退，这里才会执行
    nextK(label + " -> normal");
  }, x => console.log("k_outer says:", x));
}

demo("A");
demo("B");