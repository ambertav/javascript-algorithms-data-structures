// binary trees
    // each parent node can have at most two child nodes





// binary search trees
    // similar to binary trees in that:
        // each parent node can have at most two child nodes
    // further, the nodes are kept in a particular order, such that:
        // every node to the left of parent node is less than parent
        // every node to the right of the parent node is greater than parent


class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor () {
        this.root = null;
    }
    insert (value) { // O(log n) best and average case
        const newNode = new Node(value);
        if (this.root === null) { // if no root, create and return
            this.root = newNode;
            return this;
        } else {
            let current = this.root;
            while (true) {
                // handling duplicates
                if (value === current.value) return undefined;
                    // other options could include adding a frequency count to each node

                if (value < current.value) {
                    if (current.left === null) { // if no left property, add node and return
                        current.left = newNode;
                        return this;
                    } 
                    current = current.left; // if there is a left property, move to that node
                } else if (value > current.value) {
                    if (current.right === null) { // if no right property, add node and return
                        current.right = newNode;
                        return this;
                    }
                    current = current.right; // if there is a right property, move to that node
                }
            }
        }
    }
    find (value) { // O(log n) best and average case
        if (this.root === null) return undefined;
        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        if (!found) return undefined;
        return current;
    }
    contains (value) {
        let doesContain = !!this.find(value); // coerce boolean value of .find()
        return doesContain;
    }
}



// const bst = new BinarySearchTree
// bst.insert(10);
// bst.insert(5);
// bst.insert(15);
// bst.insert(11);
// bst.insert(3);
// console.log(bst);

// console.log(bst.find(20));
// console.log(bst.contains(20));
