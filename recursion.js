function countDown (num) {
    if (num <= 0) {
        console.log('All done!');
        return;
    }
    console.log(num);
    num--;
    countDown(num);
}

// countDown(5);


function sumRange (num) {
    if (num === 1) return 1;
    return num + sumRange(num - 1);
}

// console.log(sumRange(3));


// writing factorial iteratively
function iterativeFactorial (num) {
    let total = 1;
    for (i = num; i > 1; i--) {
        total *= 1;
    }
    return total;
}

// writing factorial recursively
function recursiveFactorial (num) {
    if (num === 1) return 1;
    return num * recursiveFactorial(num - 1);
}


// helper method recursion
function collectOdds (arr) {
    let result = [];

    function helper (helperInput) {
        if (helperInput.length === 0) return;
        if (helperInput[0] % 2 !== 0) {
            result.push(helperInput[0]);
        } 
        helper(helperInput.slice(1));
    }

    helper(arr);
    return result;
}

// pure recursion
function collectOddsValues (arr) {
    let newArr = [];
    if (arr.length === 0) return newArr;
    if (arr[0] % 2 !== 0) newArr.push(arr[0]);

    newArr = newArr.concat(collectOddsValues(arr.slice(1)));
    return newArr;
}

console.log(collectOddsValues([1, 2, 3, 4, 5]));