// depth first search

class Graph {
    constructor () {
        this.adjacencyList = {}
    }
    addVertex (vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge (vertexOne, vertexTwo) {
        this.adjacencyList[vertexOne].push(vertexTwo);
        this.adjacencyList[vertexTwo].push(vertexOne);
    }
    removeEdge (vertexOne, vertexTwo) {
        this.adjacencyList[vertexOne] = this.adjacencyList[vertexOne].filter(v => v !== vertexTwo);
        this.adjacencyList[vertexTwo] = this.adjacencyList[vertexTwo].filter(v => v !== vertexOne);
    }
    removeVertex (vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
    depthFirstRecursive (start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        function dfsHelper (vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) return dfsHelper(neighbor);
            });
        }
        dfsHelper(start);

        return result;
    }
    depthFirstIterative (start) {
        const stack = [start];
        const result = [];
        const visited = {};

        let currentVertex;
        visited[start] = true;

        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }
    breadthFirst (start) {
        const queue = [start];
        const result = [];
        const visited = {};

        let currentVertex;
        visited[start] = true;

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




const g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');


console.log(g.depthFirstRecursive('A')); // takes neighbor from beginning of adj list
console.log(g.depthFirstIterative('A')); // takes neighbor from end of adj list

console.log(g.breadthFirst('A'));