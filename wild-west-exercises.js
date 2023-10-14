// exercise 41, divide and conquer - countZeroes
function countZeroes (arr) {

    let firstIndex = binarySearch(arr);

    if (firstIndex === -1) return 0;
    // given that 1s in arr are at beginning, 0s are at end
    // returns difference between length and first instance of 0
    else return arr.length - firstIndex;

    // finds first instance of a 0
    function binarySearch (arr) {
        let left = 0;
        let right = arr.length - 1;
    
        let index = -1;
    
        while (left <= right) {
            let midpoint = Math.round((right + left) / 2);
            if (arr[midpoint] === 0) {
                index = midpoint;
                right = midpoint - 1;
            } else if (arr[midpoint] > 0) left = midpoint + 1;
            else right = midpoint - 1;
        }
        return index;
    }
}

// exercise 42, divide and conquer - sortedFrequency
function sortedFrequency (arr, val) {

    // find first and last instance of value
    let firstIndex = binarySearchForIndex(arr, val, true);
    if (firstIndex === -1) return -1;
    let lastIndex = binarySearchForIndex(arr, val, false);

    // return difference between indexes of first and last instances of value
    return lastIndex - firstIndex + 1;
}

function binarySearchForIndex (arr, val, isFirst) {
    let left = 0;
    let right = arr.length - 1;

    let index = -1;

    while (left <= right) {
        let midpoint = Math.round((left + right) / 2);
        if (arr[midpoint] === val) {
            index = midpoint;
            // conditional that moves pointers according to if finding first or last instance
            isFirst ? right = midpoint - 1 : left = midpoint + 1;
        } else if (arr[midpoint] < val) left = midpoint + 1;
        else right = midpoint - 1;
    }
    return index;
}

// exercise 43, divide and conquer - findRotatedIndex
function findRotatedIndex (arr, val) {
    // find rotation pivot index
    const pivot = binarySearchForPivot(arr);

    let index = -1;
    if (val === arr[pivot]) return pivot;

    // find which side of pivot to search
    // pass in 'left' and 'right' values of binary search
    else if (val < arr[0]) index = findValueIndex(pivot + 1, arr.length - 1, arr, val);
    else if (val > arr[0]) index = findValueIndex(0, pivot - 1, arr, val);

    return index;
}

function findValueIndex (left, right, arr, val) {
    // standard binary search for value
    // has left and right pointers passed in depending on portion of rotated array to search for value (before or after pivot)
    while (left <= right) {
        let midpoint = Math.floor((right + left) / 2);
        if (arr[midpoint] === val) return midpoint;
        if (arr[midpoint] < val) left = midpoint + 1;
        if (arr[midpoint] > val) right = midpoint - 1;
    }
    return -1
}

function findPivotIndex (arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let midpoint = Math.floor((left + right) / 2);
        if (arr[midpoint] > arr[right]) left = midpoint + 1;
        else right = midpoint;
    }
    return left;
}


// exercise 44, bubble sort
function bubbleSort(arr, comparator) {
    if (typeof comparator !== 'function') return bubbleSort(arr, compareNumbers);

    let notSwapped;
    for (let i = arr.length; i > 0; i--) {
        notSwapped = true;
        for (let j = 0; j < i - 1; j++) {
            let compValue = comparator(arr[j], arr[j + 1])
            if (compValue > 0) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                notSwapped = false;
            }
        }
        if (notSwapped) break;
    }
    return arr;
}

function compareNumbers (a, b) {
    if (a < b) return - 1;
    else if (a > b) return 1;
    return 0;
}