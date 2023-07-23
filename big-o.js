// write a function that calculates the sum of all numbers from 1 up to and including some number n

function addUpTo(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
// number of operations are depending on n, growing proportionally with n



function addUpTo(n) {
    return n * (n + 1) / 2;
}
// 3 simple operations regardless of n



/* 
which code is better?
    - faster?
    - less memory-intensve?
    - more readable?
    - brevity
*/


// can use timers?
let t1 = performance.now();
addUpTo(1000000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`)
    // not very reliable --> varies alot across runtimes even on same machine


// rather than counting seconds, count the number of simple operations the computer has to perform