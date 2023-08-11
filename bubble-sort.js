// built in array.sort with optional comparator function arugment

function numberCompare(num1, num2) {
    return num1 - num2;
}
// console.log([6, 4, 15, 10].sort(numberCompare));

function compareByLength(str1, str2) {
    return str1.length - str2.length;
}
// console.log(['Steele', 'Colt', 'Data Structures', 'Algorithms'].sort(compareByLength));




// Bubble Sort

// start looping with i at the end of array towards beginning
// start an inner loop with j from beginning until i - 1
// if arr[j] > than arr[j+1], swap those values
// return the sorted array

// GENERAL BUBBLE SORT
function bubbleSort (arr) {
    for (i = arr.length; i > 0; i--) {
        for (j = 0; j < i - 1; j++) {
            // console.log(arr, arr[j], arr[j + 1]); // to see comparisons
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
// O(n^2)

// console.log(bubbleSort([37, 45, 29, 8, 12, 88, -3]));


// optimization of bubble sort
// if input is nearly sorted, checking if there was a swap done would remove unncessary iterations

function bubbleSortOptimized (arr) {
    let notSwapped; 
    for (i = arr.length; i > 0; i--) {
        notSwapped = true;
        for (j = 0; j < i - 1; j++) {
            // console.log(arr, arr[j], arr[j + 1]); // to see comparisons
            if (arr[j] > arr[j + 1]) {
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
// O(n), since we can break out if no swapped happened, prevents unnecessary iterations