// binary heaps

// to represent a heap, can use array
// for any parent at index n, left child at 2n + 1, right child at 2n + 2
// for any child at index n, parent is at floor of (n - 1) / 2
// insert and removal of binary heap are both O(log n)
    // only compare at each level of heap

class MaxBinaryHeap {
    constructor () {
        this.values = [];
    }
    insert (element) {
        this.values.push(element);
        this.bubbleUp();
    }
    bubbleUp () {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) { // so that loop breaks once it has reached the root
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element <= parent) break; // stop loop if parent is > (thus adheres to max binary heap defining properties)
            else { // perform swap to get child < parent
                this.values[parentIndex] = element;
                this.values[index] = parent;
                index = parentIndex; // update index and continue up heap
            }
        }
    }
    extractMax () {
        // swap root with last element, and then pop the old root to return at end
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) { // ensures that popped value isn't added back in to empty heap
            this.values[0] = end;
            this.bubbleDown();
        }
        return max;
    }
    bubbleDown () { // can refactor into a recursive solution
        let index = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftIndex = 2 * index + 1;
            let rightIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftIndex < length) { // making sure that the index is not out of bounds
                leftChild = this.values[leftIndex];
                if (leftChild > element) {
                    swap = leftIndex
                }
            }

            if (rightIndex < length) { // making sure that the index is not out of bounds
                rightChild = this.values[rightIndex];
                // checking if value at right child is greater than parent or greater than left child so that can swap with right instead of left
                if ((swap === null && rightChild > element) || (swap !== null && rightChild > leftChild)) {
                    swap = rightIndex;
                }
            }
            
            if (swap === null) break; // if no valid swap was found, break out of loop

            // implement swap and start again
            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
    }
}

let heap = new MaxBinaryHeap();
heap.insert(55);
heap.insert(1);
heap.insert(14);
heap.insert(36);
heap.insert(99);

// heap.extractMax();


// console.log(heap);




// priority queues using min binary heap

class Node {
    constructor (value, priority) {
        this.value = value;
        this.priority = priority;
        // this.insertTime = Date.now(); // this is an option to handle if two or more nodes have equal priority --> will pop based on time of entry
    }
}

class PriorityQueue {
    constructor () {
        this.values = [];
    }
    enqueue (value, priority) {
        let newNode = new Node(value, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp () {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) { // so that loop breaks once it has reached the root
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element.priority >= parent.priority) break; // stop loop if parent is < (thus adheres to min binary heap defining properties)
            else { // perform swap to get child > parent
                this.values[parentIndex] = element;
                this.values[index] = parent;
                index = parentIndex; // update index and continue up heap
            }
        }
    }
    dequeue () {
        // swap root with last element, and then pop the old root to return at end
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) { // ensures that popped value isn't added back in to empty heap
            this.values[0] = end;
            this.bubbleDown();
        }
        return min;
    }
    bubbleDown () { // can refactor into a recursive solution
        let index = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftIndex = 2 * index + 1;
            let rightIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftIndex < length) { // making sure that the index is not out of bounds
                leftChild = this.values[leftIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftIndex
                }
            }

            if (rightIndex < length) { // making sure that the index is not out of bounds
                rightChild = this.values[rightIndex];
                // checking if priority at right child is smaller than parent or smaller than left child so that can swap with right instead of left
                if ((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)) {
                    swap = rightIndex;
                }
            }
            
            if (swap === null) break; // if no valid swap was found, break out of loop

            // implement swap and start again
            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
    }
}


let ER = new PriorityQueue();

ER.enqueue('common cold', 5);
ER.enqueue('gunshot wound', 1);
ER.enqueue('high fever', 3);
ER.enqueue('broken arm', 2);
ER.enqueue('concussion', 3);

// console.log(ER);

// console.log(ER.dequeue())
// console.log(ER);