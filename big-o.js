// Time Complexity


// write a function that calculates the sum of all numbers from 1 up to and including some number n

function addUpTo(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
// number of operations are depending on n, growing proportionally with n
// O(n) -- bounded by multiple of n, time
// O(1) space, doesn't create more variables/data for each input



function addUpTo(n) {
    return n * (n + 1) / 2;
}
// 3 simple operations regardless of n
// O(1) -- linear run time



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
// console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`)
    // not very reliable --> varies alot across runtimes even on same machine


// rather than counting seconds, count the number of simple operations the computer has to perform


function countUpAndDown (n) {
    console.log('Going up!');
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
    console.log('At the top!');
    console.log('Going down...');
    for (let j = n; j >= 0; j--) {
        console.log(j);
    }
    console.log('Back down. Bye!');
}
// both loops are O(n), overall the function is still considered O(n) - time


function printAllPairs (n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            console.log(i, j);
        }
    }
}
// O(n^2), quadratic time


function logAtLeast5 (n) {
    for (let i = 1; i <= Math.max(5, n); i++) {
        console.log(i);
    }
}
// O(n) - time

function logAtMost5 (n) {
    for (let i = 1; i <= Math.min(5, n); i++) {
        console.log(i);
    }
}
// O(1) - time


function double(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(2 * arr[i]);
    }
}
// array is getting longer directly porportionate to the input n
// O(n) space