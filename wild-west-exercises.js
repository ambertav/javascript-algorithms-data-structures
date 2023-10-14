// exercise 41, divide and conquer - countZeroes

// exercise 42, divide and conquer - sortedFrequency
function sortedFrequency (arr, val) {
    let firstIndex = binarySearch(arr, val, true);
    if (firstIndex === -1) return -1;
    let lastIndex = binarySearch(arr, val, false);

    return lastIndex - firstIndex + 1;
}

function binarySearch (arr, val, isFirst) {
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