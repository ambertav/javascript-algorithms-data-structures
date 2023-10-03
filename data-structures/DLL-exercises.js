class Node {
    constructor (val) {
        this.val = val
        this.next = null;      
        this.prev = null;      
    }
}

class DoublyLinkedList {
    constructor (val) {
        this.head = null;
        this.tail = null;
        this.length = 0; 
    }
    push (val) {
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    unshift (val) {
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift () {
        if (this.length === 0) return undefined;
        let shiftedNode = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = shiftedNode.next;
            this.head.prev = null;
            shiftedNode.next = null;
        }
        this.length--;
        return shiftedNode;
    }
    set (index, val) {
        let foundNode = this.get(index);
        if (foundNode !== null) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    remove (index) {
        if (index < 0 || index > this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        let removedNode = this.get(index);
        if (removedNode !== null) {
            removedNode.prev.next = removedNode.next;
            removedNode.next.prev = removedNode.prev;
            removedNode.next = null;
            removedNode.prev = null;
        }
        this.length--;
        return removedNode;
    }
    pop () {
        if (this.length === 0) return undefined;
        let poppedNode = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            this.tail.next = null;
            poppedNode.prev = null;
        }
        this.length--;
        return poppedNode;
    }
    get (index) {
        if (index < 0 || index > this.length) return false;
        let counter = 0;
        let current = this.head;
        while (counter < index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    insert (index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);

        let newNode = new Node(val);
        let beforeNode = this.get(index - 1);
        let afterNode = beforeNode.next;

        beforeNode.next = newNode;
        newNode.prev = beforeNode;
        afterNode.prev = newNode;
        newNode.next = afterNode;

        this.length++;
        return true;
    }
    reverse () {
        if (this.length === 0) return null;
        
        // swap head and tail
        let current = this.head;
        this.head = this.tail;
        this.tail = current;
        
        // iterate through and swap values
        for (let i = 0; i < this.length; i++) {
            let temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        return this;
    }
}
