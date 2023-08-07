// LINEAR SEARCH
// function that accepts array and a value
// loop and see if current array value === value
// if found, return the index at which it is found
// if not found, return -1

function linearSearch (arr, val) {
    for (i = 0; i < arr.length; i++) {
        if (val === arr[i]) {
            return i;
        }
    }
    return -1;
}
// big O = O(N), linear complexity



// BINARY SEARCH
// function accepts sorted array and value
// create left pointer, right pointer
// white the left pointer comes before the right pointer
    // create a pointer in the middle
    // if the value is what we want, return index
    // if value is too small, move left pointer up
    // if value is too large, move right pointer down
// if value is not found, return -1

function binarySearch (arr, val) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let middle = Math.round((right + left) / 2);
        if (arr[middle] === val) return middle;
        if (arr[middle] < val) left = middle;
        if (arr[middle] > val) right = middle;
    }
    return -1
}
// big O = O(log n), logarithmic time complexity




// NAIVE STRING SEARCH


// loop over the longer string
// loop over the short string
// if the characters don't match, break out of the inner loop
// if teh characters do match, keep going
// if you complete the inner loop and find a match, increment the count of matches
// return the count

function naiveStringSearch (long, short) {
    let matches = 0;
    for (i = 0; i < long.length; i++) {
        for (j = 0; j < short.length; j++) {
            if (long[i + j] !== short[j]) break;
            if (j === short.length - 1) matches++;
        }
    }
    return matches;
}