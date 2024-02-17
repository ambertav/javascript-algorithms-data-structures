// exercise 41, divide and conquer - countZeroes
function countZeroes(arr) {
    let firstIndex = binarySearch(arr);

    if (firstIndex === -1) return 0;
    // given that 1s in arr are at beginning, 0s are at end
    // returns difference between length and first instance of 0
    else return arr.length - firstIndex;

    // finds first instance of a 0
    function binarySearch(arr) {
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
function sortedFrequency(arr, val) {
    // find first and last instance of value
    let firstIndex = binarySearchForIndex(arr, val, true);
    if (firstIndex === -1) return -1;
    let lastIndex = binarySearchForIndex(arr, val, false);

    // return difference between indexes of first and last instances of value
    return lastIndex - firstIndex + 1;
}

function binarySearchForIndex(arr, val, isFirst) {
    let left = 0;
    let right = arr.length - 1;

    let index = -1;

    while (left <= right) {
        let midpoint = Math.round((left + right) / 2);
        if (arr[midpoint] === val) {
            index = midpoint;
            // conditional that moves pointers according to if finding first or last instance
            isFirst ? (right = midpoint - 1) : (left = midpoint + 1);
        } else if (arr[midpoint] < val) left = midpoint + 1;
        else right = midpoint - 1;
    }
    return index;
}

// exercise 43, divide and conquer - findRotatedIndex
function findRotatedIndex(arr, val) {
    // find rotation pivot index
    const pivot = binarySearchForPivot(arr);

    let index = -1;
    if (val === arr[pivot]) return pivot;
    // find which side of pivot to search
    // pass in 'left' and 'right' values of binary search
    else if (val < arr[0])
        index = findValueIndex(pivot + 1, arr.length - 1, arr, val);
    else if (val > arr[0]) index = findValueIndex(0, pivot - 1, arr, val);

    return index;
}

function findValueIndex(left, right, arr, val) {
    // standard binary search for value
    // has left and right pointers passed in depending on portion of rotated array to search for value (before or after pivot)
    while (left <= right) {
        let midpoint = Math.floor((right + left) / 2);
        if (arr[midpoint] === val) return midpoint;
        if (arr[midpoint] < val) left = midpoint + 1;
        if (arr[midpoint] > val) right = midpoint - 1;
    }
    return -1;
}

function findPivotIndex(arr) {
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
            let compValue = comparator(arr[j], arr[j + 1]);
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
function selectionSort(arr, comparator) {
    if (typeof comparator !== 'function') comparator = compareNumbers;
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            let compValue = comparator(arr[min], arr[j]);
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
function compareNumbers(a, b) {
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
}

// exercise 46, SLL remove
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(val) {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
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
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        let removedNode = null;
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next;
        } else {
            let counter = 0;
            let previousNode = this.head;

            while (counter < index - 1) {
                // finding the node before the desired node to remove
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
function insertionSort(arr, comparator) {
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
function merge(arr1, arr2, comparator) {
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
function mergeSort(arr, comparator) {
    if (arr.length <= 1) return arr;
    let midpoint = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, midpoint), comparator);
    let right = mergeSort(arr.slice(midpoint), comparator);
    return merge(left, right, comparator);
}

// exercise 50, pivot helper
function pivot(arr, comparator, start = 0, end = arr.length - 1) {
    if (typeof comparator !== 'function') comparator = compareNumbers;

    function swap(array, i, j) {
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
function quickSort(arr, comparator, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(arr, comparator, left, right);
        quickSort(arr, comparator, left, pivotIndex - 1);
        quickSort(arr, comparator, pivotIndex + 1, right);
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
        let digitBuckets = Array.from({
                length: 10,
            },
            () => []
        );
        for (let i = 0; i < nums.length; i++) {
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
// exercise 56, stacks push (returns new size for stack)
    push(val) {
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
    pop() {
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
        // initialize two queues within constructor
        this.queueOne = new Queue();
        this.queueTwo = new Queue();
    }

    push (val) {
        // create node
        const newNode = new Node(val);

        // push node into second queue
        this.queueTwo.enqueue(newNode);

        // push all nodes in first queue into second queue
        while (this.queueOne.first !== null) {
            this.queueTwo.enqueue(this.queueOne.dequeue());
        }

        // swap the queues
        const temp = this.queueOne;
        this.queueOne = this.queueTwo;
        this.queueTwo = temp;
        
        // return stack
        return this;
    }
    pop() {
        // if no nodes in first queue, return null
        if (!this.queueOne.first) return null;

        // else return the dequeue of first queue
        else return this.queueOne.dequeue().value;
    }
}


// ---- QUEUE AND NODE HAVE BEEN IMPLEMENTED FOR YOU ----

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(data) {
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

    dequeue() {
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
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(val) {
        const newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
        }
        return ++this.size;
    }
}

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
// exericse 60, binary search tree insert
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        } else {
            let current = this.root;
            while (true) {
                if (value === current.value) return undefined;

                if (value < current.value) {
                    if (current.left === null) {
                        current.left = newNode;
                        return this;
                    }
                    current = current.left;
                } else if (value > current.value) {
                    if (current.right === null) {
                        current.right = newNode;
                        return this;
                    }
                    current = current.right;
                }
            }
        }
    }
// exercise 61, binary search tree find
    find(value) {
        if (this.root === null) return undefined;
        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.vale) current = current.left;
            else if (value > current.value) current = current.right;
            else found = true;
        }
        if (!found) return undefined;
        return current;
    }
// exercise 62, binary search tree, DFS (pre, in, and post orders)
    DFSPreOrder() {
        const traversedNodes = [];

        function traverse(node) {
            traversedNodes.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }

        traverse(this.root);

        return traversedNodes;
    }
    DFSInOrder() {
        const traversedNodes = [];

        function traverse(node) {
            if (node.left) traverse(node.left);
            traversedNodes.push(node.value);
            if (node.right) traverse(node.right);
        }

        traverse(this.root);

        return traversedNodes;
    }
    DFSPostOrder() {
        const traversedNodes = [];

        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            traversedNodes.push(node.value);
        }

        traverse(this.root);

        return traversedNodes;
    }
// exercise 63, binary search tree, BFS
    breadthFirstSearch() {
        const traversedNodes = [];
        const queue = [];
        let node = null;

        queue.push(this.root);

        while (queue.length) {
            node = queue.shift();
            traversedNodes.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return traversedNodes;
    }
// exercise 64, binary search tree, remove
    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(current, value) {
        if (current === null) return current; // base case if tree is empty

        if (value === current.value) {
            // if value equals current value, delete this node
            if (current.left === null && current.right === null)
                return null; // case of node with no child
            // case of node with one child
            else if (current.left === null) return current.right;
            else if (current.right === null) return current.left;
            else {
                // case of node with two children

                // get smallest in right subtree (in order successor)
                let tempNode = current.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                current.value = tempNode.value;

                // delete in order successor
                current.right = this.removeNode(current.right, tempNode.value);

                return current;
            }
            // if value doesn't equal current value, recursively go down tree
        } else if (value < current.value) {
            current.left = this.removeNode(current.left, value);
            return current;
        } else {
            current.right = this.removeNode(current.right, value);
            return current;
        }
    }
// exercise 65, binary search tree, find second largest node
    findSecondLargest() {
        if (this.root === null) return undefined; // undefined if tree is empty
        let current = this.root;
        let secondLargest = undefined; // initialize return variable

        while (current && current.right) { // while there is a current a node to the right of current (greater than)
            // if current's child has a right node, move current to the right
            // i.e as long as the current node has a child with a greater value, move down
            if (current.right.right) current = current.right;

            else return secondLargest = current.value; // else, set return to be current's value
            // would be second largest if right node has no right children
        }

        return secondLargest;
    }
// exercise 66, binary search tree, check if balanced
    isBalanced() {
        // helper to get and compare the height of each side of tree 
        function getHeight(node) { 
            if (node === null) return 0;

            const leftHeight = getHeight(node.left); // find height of left side
            const rightHeight = getHeight(node.right); // find height of right side

            // if either side of root node is unbalanced or the absolute difference between sides is greater than 1, return -1
            if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;

            // else return height of subtree
            return Math.max(leftHeight, rightHeight) + 1;
        }

        // run getHeight from root and return boolean comparison to -1 (which indicates unbalanced)
        return getHeight(this.root) !== -1;
    }
}

class MaxBinaryHeap {
    constructor () {
        this.values = [];    
    }
// exercise 67, binary heap insert
    insert (val) {
        this.values.push(val);
        this.bubbleUp();
    }
    bubbleUp () {
        let index = this.values.length - 1;
        const element = this.values[index];
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element <= parent) break;
            else {
                this.values[parentIndex] = element;
                this.values[index] = parent;
                index = parentIndex;
            }
        }
    }
// exercise 68, binary heap extractMax
    extractMax () {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown();
        }
        return max;
    }
    bubbleDown () {
        let index = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftIndex = 2 * index + 1;
            let rightIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftIndex < length) {
                leftChild = this.values[leftIndex];
                if (leftChild > element) swap = leftIndex;
            }

            if (rightIndex < length) {
                rightChild = this.values[rightIndex];
                if ((swap === null && rightChild > element) || (swap !== null && rightChild > leftChild)) swap = rightIndex;
            }

            if (swap === null) break;
    
            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
    }
}

class Graph {
    constructor () {
        this.adjacencyList = {};
    }
// exercise 69, graphs add vertex
    addVertex (vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
// exercise 73, graphs add edge
    addEdge (vertexOne, vertexTwo) {
        this.adjacencyList[vertexOne].push(vertexTwo);
        this.adjacencyList[vertexTwo].push(vertexOne);
    }
// exercise 70, graphs remove edge
    removeEdge (vertexOne, vertexTwo) {
        this.adjacencyList[vertexOne] = this.adjacencyList[vertexOne].filter(v => v !== vertexTwo);
        this.adjacencyList[vertexTwo] = this.adjacencyList[vertexTwo].filter(v => v !== vertexOne);
    }
// exercise 71, graphs remove vertex
    removeVertex (vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
// exercise 72, graphs depth first search
    depthFirstSearch (start) { // recursive
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        function DFSHelper (vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) return DFSHelper(neighbor);
            });
        }

        DFSHelper(start);

        return result;
    }
// exercise 74, graphs breadth first search
    breadthFirstSearch (start) {
        const queue = [start];
        const result = [];
        const visited = { [start]: true }

        let currentVertex;

        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}

// exercise 75, dijkstra exercise
function WeightedGraph () {
    /*** Use Graph as a constructor for WeightedGraph to inherit from! ***/
    Graph.call(this);
}

WeightedGraph.prototype = Object.create(Graph.prototype);
WeightedGraph.prototype.constructor = WeightedGraph;

WeightedGraph.prototype.addEdge = function (vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
}

WeightedGraph.prototype.dijkstra = function (start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};

    let path = [];
    let smallest;

    for (let vertex in this.adjacencyList) {
        if (vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
            while(previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }
        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in this.adjacencyList[smallest]) {
                let nextNode = this.adjacencyList[smallest][neighbor];
                let candidate = distances[smallest] + nextNode.weight;
                if (candidate < distances[nextNode.node]) {
                    distances[nextNode.node] = candidate;
                    previous[nextNode.node] = smallest;
                    nodes.enqueue(nextNode.node, candidate);
                }
            }
        }
    }
    return path.concat(smallest).reverse();
}

function Graph () {
  this.adjacencyList = {};
}

Graph.prototype.numEdges = function () {
  let total = 0;

  Object.values(this.adjacencyList).forEach(list => {
    total += list.length;
  });

  // note that we've double-counted up til now since we've looked at
  // the adjacencyList for every node.
  return total / 2;
};

Graph.prototype.addVertex = function (vertex) {
  this.adjacencyList[vertex] = [];
};

Graph.prototype.addEdge = function (vertex1, vertex2) {
  this.adjacencyList[vertex1].push(vertex2);
  this.adjacencyList[vertex2].push(vertex1);
};

Graph.prototype.removeVertex = function (vertex) {
  while (this.adjacencyList[vertex].length) {
    const adjacentVertex = this.adjacencyList[vertex].pop();
    this.removeEdge(adjacentVertex, vertex);
  }
  delete this.adjacencyList[vertex];
};

Graph.prototype.removeEdge = function (vertex1, vertex2) {
  this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
    v => v !== vertex2
  );
  this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
    v => v !== vertex1
  );
};

/***  Use the following as a PriorityQueue (it's a min heap)! ***/
class PriorityQueue {
  constructor () {
    this.values = [];
  }
  enqueue (val, priority) {
    this.values.push({val, priority });
    this.sort();
  }
  dequeue () {
    return this.values.shift();
  }
  sort () {
    this.values.sort((a, b) => a.priority - b.priority);
  };
}

// exercise 76, dynamic programming coin change
function coinChange(denominations, value) {
    const dp = new Array(value + 1).fill(0);
    dp[0] = 1;

    for (let coin of denominations) {
        for (let i = coin; i <= value; i++) {
            dp[i] += dp[i - coin];
        }
    }

    return dp[value];
}

// exercise 77, coin change greedy algorithm
function minCoinChange (coins, amount) {
    const result = [];

    for(let i = coins.length -1; i >= 0; i--) {
        while (amount >= coins[i]) {
            amount -= coins[i];
            result.push(coins[i]);
        }
    }

    return result;
}

// exercise 78, frequency counter constructNote

// exercise 79, frequency counter findAllDuplicates

// exercise 80, frequency counter / multiple pointer findPair

// exercise 81, trie add word

// exercise 82, trie remove word

// exercise 83, trie findWords

// exercise 84, trie getWords

// exercise 85, trie autocomplete