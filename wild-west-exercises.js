// exercise 41, divide and conquer - countZeroes
function countZeroes (arr) {

    let firstIndex = binarySearch(arr);

    if (firstIndex === -1) return 0;
    else return arr.length - firstIndex;

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
    let firstIndex = binarySearchForIndex(arr, val, true);
    if (firstIndex === -1) return -1;
    let lastIndex = binarySearchForIndex(arr, val, false);

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
            isFirst ? right = midpoint - 1 : left = midpoint + 1;
        } else if (arr[midpoint] < val) left = midpoint + 1;
        else right = midpoint - 1;
    }
    return index;
}

// exercise 43, divide and conquer - findRotatedIndex

// exercise 44, bubble sort