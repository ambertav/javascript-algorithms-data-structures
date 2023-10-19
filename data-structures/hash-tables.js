// javascript (and others) has built in hash table data structures (objects* and maps)
// implementing own for greater understanding

// hash function
    // ideally constant time, distributes uniformly, same input yields same output


// basic sample implementation
function hash (key, arrayLength) {
    let total = 0;
    for (let i = 0; i < key.length; i++) { // loop through each character of the string passed
        let char = key[i];
        let value = char.charCodeAt(0) - 96; // find the numerical representation of the char's alphabetic position (i.e a = 1 and z = 26)
        total = (total + value) % arrayLength; // accumulate values from each char of the key, and find modulo of desired hash array length
    }
    return total; // return the hash index
}
    // problems
        // not constant time
        // outputs are not very randomized -- high collisions


// revisiting above to improve problem points:
function hashRevisited (key, arrayLength) {
    let total = 0;
    let prime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) { // limits number of loops to a max of 100;
        let char = key[i];
        let value = char.charCodeAt(0) - 96; 
        total = (total * prime + value) % arrayLength; // multiply by a prime to improve uniform spread of keys (less collisions)
        // note: using a prime number for arrayLength would also improve the implementation of the hash table
    }
    return total; // return the hash index
}


// handling collisions
    // separate chaining -- create another data structure at key (array, linked list)
    // linear probing -- loop through to finx next empty slot, and store there



// using separate chaining
// doesn't reset value with a particular key, only returns first value for a particular key
class HashTable {
    constructor(size = 3) {
        this.keyMap = new Array(size);
    }
    _hash (key) {
        let total = 0;
        let prime = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96; 
            total = (total * prime + value) % this.keyMap.length;
        }
        return total;
    }
    set (key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) { // creates an array at index if empty
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]); // pushes key, value at array
    }
    get (key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) { // looping through array at hash index
                if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1]; // finds key and returns the value
            }
        }
        return undefined; // if not found
    }
    keys () {
        let keysArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    // to only return array of unique values, check if the value exists before pushing
                    if (!keysArray.includes(this.keyMap[i][j][0])) keysArray.push(this.keyMap[i][j][0]);
                }
            }
        }
        return keysArray;
    }
    values () {
        let valuesArray = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    // to only return array of unique values, check if the value exists before pushing
                    if (!valuesArray.includes(this.keyMap[i][j][1])) valuesArray.push(this.keyMap[i][j][1]);
                }
            }
        }
        return valuesArray;
    }
}

let ht = new HashTable();

ht.set('french', 'fries')
ht.set('cheese', 'pizza')
ht.set('salmon', 'sushi')
ht.set('black bean', 'burger')


// console.log(ht);
// console.log(ht.get('french'))

ht.set('beef', 'burger');
ht.set('cheese', 'quesadilla');
// console.log(ht.values());
// console.log(ht.keys());
// console.log(ht.get('cheese'))