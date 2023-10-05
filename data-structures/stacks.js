// array implementation

const stack = [];
// to adhere to stack LIFO principles
    // utilize push to add and pop to remove
            // more efficient in terms of Big O, although utilizing an array isn't the most effective way to implement a stack
                // (i.e see linked list implement, as a stack doesn't need indexing)
        // OR
    // utilize unshift to add and shift to remove
            // this is more costly in terms of Big O
                // every addition and deletion causes a re-indexing of all elements



// linked list implementation
    // light weight and more efficient implementation of a stack
    // standard implementation of linked list's pop and push methods are not constant time, as it requires looping
        // for a stack, utilize unshift and shift methods to achieve the LIFO principle and constant time Big O
            // Can rename unshift and shift to push and pop


class Node {
    constructor (val) {
        this.val = val;
        this.next = null;
    }
}

class Stack {
    constructor () {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
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
    pop () {
        if (!this.first) return null;
        const removedNode = this.first;
        if (this.first === this.last) this.last = null;
        this.first = this.first.next;
        this.size--;
        return removedNode;
    }
}

