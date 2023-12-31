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

// console.log(collectOddsValues([1, 2, 3, 4, 5]));





// problems 10-14
// function power that acepts base and exponent, should return the power, essential replicate Math.pow()

function power (base, exp) {
    if (exp === 0) return 1;
    return base * power(base, exp - 1);
}

// console.log(power(2,0))
// console.log(power(2,2))
// console.log(power(2,4))


function factorial (num) {
    if (num === 1 || num === 0) return 1;
    return num * factorial(num - 1);
}

// console.log(factorial(0));
// console.log(factorial(1));
// console.log(factorial(2));
// console.log(factorial(7));


function productOfArray (arr) {
    let product = 1;
    if (arr.length === 0) return product;
    product *= arr[0];
    return product * productOfArray(arr.slice(1));
}

// less memory solution
// function productOfArray(arr) {
//     if(arr.length === 0) {
//         return 1;
//     }
//     return arr[0] * productOfArray(arr.slice(1));
// }

// console.log(productOfArray([1, 2, 3]))
// console.log(productOfArray([1, 2, 3, 10]))


function recursiveRange (num) {
    if (num === 0) return 0;
    return num + recursiveRange(num - 1);
}

// console.log(recursiveRange(6));

function fib (n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n -2);
}

// console.log(fib(4));



// exercise 15, reverse a string

function reverse (string) {
    let output = '';
    if (output.length === string.length) return output;
    output += string[string.length - 1];
    output = output.concat(reverse(string.slice(0, -1)));
    return output;
}

// console.log(reverse('hello'));


// exercise 16, is palindrome

function isPalindrome (string) {
    if (string[0] === string[string.length - 1]) return true;
    isPalindrome(string.slice(0, -1));
    return false;
}
// console.log(isPalindrome('tacocat'));


// exercise 17, checking if array has an odd

function isOdd (val) {
    return val % 2 !== 0 ? true : false;
}

function someRecursive (arr, callback) {
    if (arr.length === 0) return false;
    if (callback(arr[0])) return true;
    return someRecursive(arr.slice(1), callback);
}

// console.log(someRecursive(([4,6,8], isOdd)));


// exercise 18, accepts array of arrays and flattens

function flatten (arr) {
    let output = [];
    for (i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) output = output.concat(flatten(arr[i]));
        else output.push(arr[i]);
    }
    return output;
}

// console.log(flatten([1, 2, 3, [4, 5]]))


// exercise 19, capitalize first letter of each string in array

function capitalizeFirst (arr) {
    if (arr.length === 1) return [arr[0][0].toUpperCase() + arr[0].substr(1)];
    const output = capitalizeFirst(arr.slice(0, -1));
    const string = arr.slice(arr.length - 1)[0][0].toUpperCase() + arr.slice(arr.length-1)[0].substr(1);
    output.push(string);
    return output;
}


// exercise 20, returns sum of all even numbers in object, which may or may not have nested objects
function nestedEvenSum (obj, sum = 0) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') sum += nestedEvenSum(obj[key]);
        else if (typeof obj[key] === 'number' && obj[key] % 2 === 0)sum += obj[key];
    }
    return sum;
}

// exercise 21, takes array and capitalizes each string in array
function capitalizeWords (arr) {
    if (arr.length === 1) return [arr[0].toUpperCase()];
    let output = capitalizeWords(arr.slice(0, -1));
    output.push(arr.slice(arr.length -1)[0].toUpperCase());
    return output;
}

// console.log(capitalizeWords(['hi', 'hello', 'good morning']))


// exercise 22
function stringifyNumbers(obj) {
    var newObj = {};
    for (let key in obj) {
      if (typeof obj[key] === 'number') newObj[key] = obj[key].toString();
      else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) newObj[key] = stringifyNumbers(obj[key]);
      else newObj[key] = obj[key];
    }
    return newObj;
  }

// exercise 23, takes object and returns array of all strings within object, which may or may not have nested objects
function collectStrings (obj) {
    let output = [];
    for (let key in obj) {
        if (typeof obj[key] === 'object') output = output.concat(collectStrings(obj[key]));
        else if (typeof obj[key] === 'string') output.push(obj[key]);
    }
    return output;
}