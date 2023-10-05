// array implementation

const queue = [];

// add with .push()
queue.push('first');
queue.push('second');
queue.push('third');

// remove with .shift()
queue.shift()


// to adhere to queue FIFO principles
    // utilize push to add and shift to remove
        // OR
    // utilize unshift to add and pop to remove

    // both ways involve either adding or removing from the front of the array and causing a re-indexing of all elements
        // not ideal, (i.e. see linked list implementation)


// linked list implementation
    // light weight and more efficient implementation of a queue
    // to adhere to queue FIFO principles and achieve constant time for both methods:
        // will add to the end (push) and remove (shift) from the beginning
            // avoids looping through the entire list
    // rename methods to enqueue and dequeue respectively


    class Node {
        constructor (val) {
            this.val = val;
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
            const newNode = new Node(val);
            if (!this.first) {
                this.first = newNode;
                this.last = newNode;
            } else {
                this.last.next = newNode;
                this.last = newNode;
            }
            return ++this.size;
        }
        dequeue () {
            if (!this.first) return null;
            const dequeuedNode = this.first;
            if (this.first === this.last) this.last = null;
            this.first = this.first.next;
            this.size--;
            return dequeuedNode;
        }
    }