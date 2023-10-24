// adjacency matrix
    // matrix -- two dimensional structure (i.e nested arrays)
        // store information as rows and columns
    // every time a node is added, have to create a new row and column
        // storing true / false edge (either through boolean or binary)
    // performance
        // takes up more space in sparse graphs
        // slower to iterate over all edges
        // faster to loopup specific edge

// adjacency list
    // use an array / list, or hash table / map to store the edges
        // use an array corresponding to a node, and store a nested array containing edges to other nodes
    // performance
        // takes up less space in sparse graphs
        // faster to iterate over all edges
        // slower to lookup specific edge


// operations and Big O
    // add vertex
        // adj list -- O(1)
        // adj matrix -- O(v^2)
    // add edge
        // adj list -- O(1)
        // adj matrix -- O(1)
    // remove vertex
        // adj list -- O(v + e)
        // adj matrix -- O(v^2)
    // remove edge
        // adj list -- O(e)
        // adj matrix -- O(1)
    // query
        // adj list -- O(v + e)
        // adj matrix -- O(1)
    // storage
        // adj list -- O(v + e)
        // adj matrix -- O(v^2)




// implementing adjacency list representation of graph (undirected)


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
}

// const graph = new Graph;
// graph.addVertex('Tokyo');
// graph.addVertex('Dallas')
// graph.addVertex('Aspen')
// console.log(graph)
// graph.addEdge('Tokyo', 'Dallas');
// graph.addEdge('Tokyo', 'Aspen');
// graph.addEdge('Aspen', 'Dallas');
// console.log(graph)
// graph.removeEdge('Tokyo', 'Dallas');
// console.log(graph)
// graph.removeVertex('Aspen')
// console.log(graph)
