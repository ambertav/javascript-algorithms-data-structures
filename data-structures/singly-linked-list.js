// piece of data --> val
// reference to the next node --> next


class Node {
    constructor (val) {
        this.val = val;
        this.next = null;
    }
}


class SinglyLinkedList {
    constructor () {
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
    traverse () {
        let current = this.head;
        while (current) {
            console.log(current.val)
            current = current.next;
        }
    }
    pop () {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }
    unshift (val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift () {
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }
}

let list = new SinglyLinkedList();
list.push('hello')
list.push('goodbye')
list.push('good')
list.push('morning')
list.push('goodnight')
// list.traverse();
// list.shift();
// list.unshift('hi');
// console.log(list);
