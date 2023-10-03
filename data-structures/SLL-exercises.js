class Node {
    constructor (val) {
        this.val = val;
        this.next = null;      
    }
}

class SinglyLinkedList{

    constructor (val) {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    // implement push
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
    // implement pop
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
    // implement get
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
    // implement insert
    insert (index, val) {
        if (index < 0 || index >= this.length) return false;
        if (index === this.length) return !!this.push(val);
        if (index === 0) { // unshift
            let newNode = new Node(val);
            if (!this.head) {
                this.head = newNode;
                this.tail = this.head;
            } else {
                newNode.next = this.head;
                this.head = newNode;
            }
            this.length++;
            return true;
        }
        let newNode = new Node(val);
        let previous = this.get(index - 1);
        let temp = previous.next;
        previous.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }
    // implement set
    set (index, val) {
        let foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = val
            return true;
        }
        return false;
    }
    rotate (num) {
        let counter = 0;

        // for negative num, find difference between length and num for equivalent positive integer rotator value 
        if (num < 0) {
            let difference = this.length + num;
            num = difference;
        }

        while (counter < num) {
            // swap head and tail
                let node = this.head;
                this.head = node.next;
                this.tail.next = node;
                this.tail = node;
                this.tail.next = null;
                counter++;
        }
    }
}

