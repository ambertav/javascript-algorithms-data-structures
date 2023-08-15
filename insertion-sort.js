// start by picking the second element in array
// compare the first and second element and swap if necessary
// continue to next element
    // if in incorrect order, iterate through the sorted portion to place element in correct place
// repeat until array is sorted

function insertionSort (arr) {
    for (i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = currentVal;
    }
    return arr;
}

console.log(insertionSort([2, 1, 9, 76, 4]));