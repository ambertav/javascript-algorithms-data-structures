// write function same, which accepts two arrays
// function should return true if every value in the array has its corresponding square in the second array
// frequency of values must be the same

// test cases
// console.log(same([1, 2, 3], [4, 1, 9])) // true
// console.log(same([1, 2, 3], [1, 9])) // false
// console.log(same([1, 2, 1], [4, 4, 1])) // false

// inefficient, solution
// .indexOf() is an iterator method, this solution is effectively nested loops
/*
function same (arr1 , arr2) {
    if (arr1.length !== arr2.length) return false;

    for (i = 0; i < arr1.length; i++) {
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if (correctIndex === -1) return false;
        arr2.splice(correctIndex, 1);
    }

    return true;
}
*/


// refactored, frequency counter version
function same (arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // initialize two objects
    const freqCounter1 = {};
    const freqCounter2 = {};

    // count the frequency of each value in the arrays, and store in respective objects
    for (let val of arr1) {
        freqCounter1[val] = (freqCounter1[val] || 0) + 1
    }
    
    for (let val of arr2) {
        freqCounter2[val] = (freqCounter2[val] || 0) + 1
    }

    for (let key in freqCounter1) {
        // see if the second object contains the square of the first object
        if (!(key ** 2 in freqCounter2)) {
            return false;
        }
        // see if the second object contains the square in the same frequency
        if (freqCounter2[key ** 2] !== freqCounter1[key]) {
            return false;
        }
    }

    return true;
}


// anagram 
// given two strings, write function that determines if the second string is an anagram
// same letters must be present, and in same frequency
// input: all lowercase, no periods or spaces or punctuation

/* self solution 
function validAnagram(str1, str2){
    if (str1.length !== str2.length) return false;

    const freq1 = {};
    const freq2 = {};

    for (let letter of str1) {
        freq1[letter] = (freq1[letter] || 0) + 1;
    }
    
    for (let letter of str2) {
        freq2[letter] = (freq2[letter] || 0) + 1;
    }

    for (let key in freq1) {
        if (!(key) in freq2) return false;
        if (freq2[key] !== freq1[key]) return false;
    }

    return true;
}
*/

function validAnagram(first, second) {
    if (first.length !== second.length) return false;

    const lookup = {};

    for (i = 0; i < first.length; i++) {
        let letter = first[i];
        lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
    }

    for (i = 0; i < second.length; i++) {
        let letter = second[i];
        if (!lookup[letter]) {
            return false;
        } else {
            lookup[letter] -= 1;
        }
    }

    return true;
}

// console.log(validAnagram('aar', 'raa'));


// Multiple Pointers

// write function called sumZero that accepts a sorted array of integers
// should find the first pair where the sum is 0
// return array that included both values that sum to zero or undefined if such a pair does not exist


// inefficient solution

/* O(n^2)
function sumZero (arr) {
    for (i = 0; i < arr.length; i++) {
        for (j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === 0) {
                return [arr[i], arr[j]];
            }
        }
    }
}
*/

// O(n)
function sumZero (arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let sum = arr[left] + arr[right];
            if (sum === 0) {
                return [arr[left], arr[right]];
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
    }
}


// function countUniqueValues accepts sorted array and counts the unique values in the array
// can be negative, will always be sorted

// self solution
/*
function countUniqueValues (arr) {
    let i = 0;
    let j = 1;
    while (j <= arr.length) {
        if (arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j];
        } else {
            j++;
        }
    }
    return i;
}
*/

// given solution
function countUniqueValues (arr) {
    if (arr.length === 0) return 0;
    let i = 0;
    for (j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
}


// Sliding Window

// function maxSubarraySum, accepts an array of integers and number n
// should calculate the maximum sum of n consecutive elements

// O(N)
function maxSubarraySum (arr, num) {
    let maxSum = 0;
    let tempSum = 0;
    if (arr.length < num) return null;
    for (i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    tempSum = maxSum;
    for (i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

// Divide and Conquer

// function search that accepts a value and returns the index the value is located within sorted array
// if value is not found, return -1

function search (arr, val) {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let currentElement = arr[middle];

        if (arr[middle] < val) {
            min = middle + 1;
        } else if (arr[middle] > val) {
            max = middle - 1;
        } else {
            return middle;
        }
    }
    return -1;
}


// same frequency of digits in two numbers
function sameFrequency (int1, int2) {
    let num1 = int1.toString();
    let num2 = int2.toString();

    if (num1.length !== num2.length) return false;

    const lookup = {};

    for (i = 0; i < num1.length; i++) {
        let digit = num1[i];
        lookup[digit] ? lookup[digit] += 1 : lookup[digit] = 1;
    }

    for (j = 0; j < num2.length; j++) {
        let digit = num2[j];
        if (!lookup[digit]) {
            return false;
        } else {
            lookup[digit] -= 1;
        }
    }
    return true;
}


// are there duplicates, variable number of arguments
function areThereDuplicates (...args) {
    if (args.length === 0) return false;

    let left = 0;
    let right = args.length - 1;

    while (left < right) {
        if (args[left] === args[right]) return true;
        if (args[left + 1] === args[right]) return true;
        left++;
        right--;
    }
    return false;
}

/* one line solution -- sets can't have duplicate 
function areThereDuplicates(...args) {
    return new Set(args).size !== args.length;
}
*/


function averagePair (arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let avg = (arr[left] + arr[right]) / 2;

        if (avg === target) {
            return true;
        } else if (avg < target) {
            left++;
        } else {
            right--;
        }
    }
    return false;
}


function isSubsequence (first, second) {
    const lookup = Array.from(first);

}


function maxSubarraySum (arr, int) {
    let maxSum = 0;
    let tempSum = 0;

    if (arr.length < int) return null;

    for (i = 0; i < int; i++) {
        maxSum += arr[i];
    }

    tempSum = maxSum;

    for (i = int; i < arr.length; i++) {
        tempSum = tempSum - arr[i - int] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}


// array and int parameters are positive
// return minimal length of contiguous subarray oh which sum is greater/equal to int passed
// if not return 0;
function minSubarrayLen (arr, int) {
    let testSum = 0;
    let tempLen = 0;

    for (i = 0; i < arr.length; i++) {
        if (testSum < int) {
            testSum += arr[i]
        } else if (testSum >= int) {
            tempLen = i;

        }
        return tempLen;
    }

    return 0;
}
