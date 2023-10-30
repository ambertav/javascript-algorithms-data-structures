// writing a weighted graph

class WeightedGraph {
    constructor () {
        this.adjacencyList = {};
    }
    addVertex (vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge (vertexOne, vertexTwo, weight) {
        this.adjacencyList[vertexOne].push({
            node: vertexTwo, 
            weight
        });
        this.adjacencyList[vertexTwo].push({
            node: vertexOne,
            weight
        });
    }
    dijkstra (start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};

        let path = []; // to return
        let smallest;

        // biuld up initial state
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

        // as long as there are nodes to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().value;
            if (smallest === finish) {
                // done and have to build up path
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    // find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    // calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    if (candidate < distances[nextNode.node]) {
                        // updating new smallest distance to neighbor
                        distances[nextNode.node] = candidate;
                        // updating previous, how we got to neighbor
                        previous[nextNode.node] = smallest;
                        // enqueue in priority queue with new priority
                        nodes.enqueue(nextNode.node, candidate);
                    }
                }
            }
        }
        // adding start to path and reversing since path is built from finish
        return path.concat(smallest).reverse(); 
    }
}

// efficient priority queue from binary heap section
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

class Node {
    constructor (value, priority) {
        this.value = value;
        this.priority = priority;
    }
}


const wGraph = new WeightedGraph ();

wGraph.addVertex('A');
wGraph.addVertex('B');
wGraph.addVertex('C');
wGraph.addVertex('D');
wGraph.addVertex('E');
wGraph.addVertex('F');

wGraph.addEdge('A', 'B', 4);
wGraph.addEdge('A', 'C', 2);
wGraph.addEdge('B', 'E', 3);
wGraph.addEdge('C', 'D', 2);
wGraph.addEdge('C', 'F', 4);
wGraph.addEdge('D', 'E', 3);
wGraph.addEdge('D', 'F', 1);
wGraph.addEdge('E', 'F', 1);

// console.log(wGraph.adjacencyList);

console.log(wGraph.dijkstra('A', 'E'));
console.log(wGraph.dijkstra('A', 'F'));