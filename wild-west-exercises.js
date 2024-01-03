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
    if (typeof comparator !== 'function') comparator = compareNumbers;

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

// exercise 45, selection sort
function selectionSort (arr, comparator) {
    if (typeof comparator !== 'function') comparator = compareNumbers;
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            let compValue = comparator(arr[min], arr[j])
            if (compValue > 0) min = j;
        }
        if (min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp; 
        }
    }
    return arr;
}

// number comparator function
function compareNumbers (a, b) {
    if (a < b) return - 1;
    else if (a > b) return 1;
    return 0;
}

// exercise 46, SLL remove
class Node {
    constructor (val){
        this.val = val;
        this.next = null; 
    }
}

class SinglyLinkedList {
    constructor (val) {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push (val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    remove (index) {
        if (index < 0 || index >= this.length) return undefined;
        let removedNode = null;
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next;
        } else {
            let counter = 0;
            let previousNode = this.head;
    
            while (counter < index - 1) { // finding the node before the desired node to remove
                previousNode = previousNode.next;
                counter++;
            }
            removedNode = previousNode.next; // finds the removedNode
            previousNode.next = removedNode.next; // linked list leaps over the removed node
            removedNode.next = null; // removes node's attachment to linked list
        }
        this.length--;
        if (this.length === 0) {
            this.head === null;
            this.tail === null;
        }
        return removedNode;
    }
}

// exercise 47, insertion sort
function insertionSort (arr, comparator) {
    if (typeof comparator !== 'function') comparator = compareNumbers;
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && comparator(arr[j], current) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

// exercise 48, merge helper
function merge (arr1, arr2, comparator) {
    if (typeof comparator !== 'function') comparator = compareNumbers;
    const result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        let compValue = comparator(arr1[i], arr2[j]);
        if (compValue <= 0) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
}

// exercise 49, merge sort
function mergeSort (arr, comparator) {
    if (arr.length <= 1) return arr;
    let midpoint = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, midpoint), comparator);
    let right = mergeSort(arr.slice(midpoint), comparator);
    return merge(left, right, comparator);
}

// exercise 50, pivot helper
function pivot (arr, comparator, start = 0, end = arr.length - 1) {
    if (typeof comparator !== 'function') comparator = compareNumbers;

    function swap (array, i , j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let pivot = arr[start];
    let swapIndex = start;

    for (let i = start + 1; i < arr.length; i++) {
        let compValue = comparator(pivot, arr[i]);
        if (compValue > 0) {
            swapIndex++;
            swap(arr, swapIndex, i);
        }
    }

    swap(arr, start, swapIndex);
    return swapIndex;
}

// exercise 51, quick sort
function quickSort (arr, comparator, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(arr, comparator, left, right)
        quickSort(arr, comparator, left, pivotIndex - 1);
        quickSort(arr, comparator, pivotIndex + 1, right)
    }
    return arr;
}

// exercise 52, radix helper to return digit in that number at given position 
function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// exercise 53, radix helper to return number of digits in integer
function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// exercise 54, radix helper to count number of digits in integers in array
// to determine number with most digits
function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

// exercise 55, radix sort
function radixSort(nums) {
    let maxDigitCount = mostDigits(nums);
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < nums.length; i++) {
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets)
    }
    return nums;
}

class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor () {
        this.first = null;
        this.last = null;  
        this.size = 0;
    }
// exercise 56, stacks push (returns new size for stack)
    push (val) {
        const newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            let temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }
// exercise 57, stacks pop (returns value of removed node)
    pop () {
        if (!this.first) return null;
        const removedNode = this.first;
        if (this.first === this.last) this.last = null;
        this.first = this.first.next;
        this.size--;
        removedNode.next = null;
        return removedNode.value;
    }
}

// exercise 58, stack with 2 queues
class Stack {
    constructor () {
        
    }
    push (val) {

    }
    pop () {

    }
}

    // ---- QUEUE AND NODE HAVE BEEN IMPLEMENTED FOR YOU ----

class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor () {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue (data) {
        var node = new Node(data);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }

        return ++this.size;
    }

    dequeue () {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}


// exericse 59, queue enqueue
class Node {
    constructor (value) {
        this.value = value;
        this.next = null;      
    }
}

class Queue {
    constructor () {
        this.first = null;
        this.last = null;
        this.size = 0;
    } 
    enqueue (val) {
        const newNode = new Node (val)
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
        }
        return ++this.size;
    }
}

// exericse 60, binary search tree insert
class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
    insert(value){
        
    }
  }