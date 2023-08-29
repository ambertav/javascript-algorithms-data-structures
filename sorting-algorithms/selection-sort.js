// store the first element as the smallest value
// compare this item to the next tiem in the array until you find a smaller number
// if smaller numer is found, designate that number to be the new minimum and continue to end
// if minimum is not the value you initially began with, swap values


function selectionSort (arr) {
    for (i = 0 ; i < arr.length; i++) {
        let lowest = i;
        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j;
            } 
        }
        if (i !== lowest) {
            let temp = arr[i];
            arr[i] = arr[lowest];
            arr[lowest] = temp;
        }
    }
    return arr;
}

console.log(selectionSort([34, 22, 10, 19, 17]))

// time complexity O(n^2)
// if minimizing the number of swaps is important (i.e in a case of memory) then selection sort is better than bubble
// otherwise, bubble sort is more efficient