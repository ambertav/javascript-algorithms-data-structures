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
        if (this.length === 0) this.tail = null;
        return currentHead;
    }
    get (index) {
        if (index < 0 || index >= this.length) return null;
        let counter = 0;
        let current = this.head;
        while (counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    set (index, val) {
        let foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    insert (index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === this.length) return !!this.push(val); // double bang to coerce boolean
        if (index === 0) return !!this.unshift(val); // double bang to coerce boolean
        let newNode = new Node(val);
        let previous = this.get(index - 1);
        let temp = previous.next;
        previous.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }
    remove (index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        let previousNode = this.get(index - 1);
        let removed = previousNode.next;
        previousNode.next = removed.next;
        this.length--;
        return removed;
    }
    reverse () {
        // swap head and tail
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        // iterate through and swap values
        let next;
        let previous = null;
        for (let i = 0; i < this.length; i++) {
            next = node.next;
            node.next = previous;
            previous = node;
            node = next;
        }
    }
}

let list = new SinglyLinkedList();
list.push('hello')
list.push('goodbye')
list.push('good')
list.push('morning')
list.push('goodnight')



// list.shift();
// list.unshift('hi');
// (list.get(3);
// list.set(2, 'testing')
// list.insert(4, 'something')
// list.remove(2)
// list.reverse();


// list.traverse();
// console.log(list);