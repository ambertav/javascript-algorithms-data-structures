// use on problems with:
    // optimal substructure
        // combining optimal solutions of subproblems would be optimal solution for whole problem 
    // overlapping subproblems
        // subproblems contain reusable elements


// simple recursive solution for fibonacci sequence
function fib (n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib (n - 2);
}
// Big O
    // growth in recursive calls per increase in n are exponential, worse than O(n^2)
    // O(1.6^n) or ~O(2^n)


// how to improve?
    // repeating subproblems over and over (i.e for fib(6), are repeating fib(4) twice, fib(3) thrice, etc. etc.)

    // enter dynamic programming, "using past knowledge to make solving a future problem easier"
        // if can store the solution to a subproblem rather than recalcuating each time



// memo-ized solution (top down)
    // because of recursion, still runs into problem of maximum call stack error overflow
function fibMemo (n, memo = []) {
    if (memo[n] !== undefined) return memo[n]; // if the value is in memo, retrieve
    if (n <= 2) return 1; // base case
    let result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo); // recursive call to calculate
    memo[n] = result; // store value in memo
    return result; // return value
}
// Big O
    // grows roughly linear with n, O(n)



    
// tabulation solution (bottom up)
    // better with space complexity, won't run into maximum call stack error overflow on large n
    // shown with iteration, can use recursion
function fibTab (n) {
    if (n <= 2) return 1;
    let fibNums = [0, 1, 1]; // just declaring with first 3 numbers of sequence
    for (let i = 3; i <= n; i++) {
        fibNums[i] = fibNums[i - 1] + fibNums[1 - 2];
    }
    return fibNums[n];
}