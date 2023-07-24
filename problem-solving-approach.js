// Understand the Problem

// write a function that takes two numbers and returns the sum

/*
Restate problem in own words
    - addition
What are the inputs
    - depending on language, the numbers can be too large to add (i.e JavaScript will give up and return infinity)
        - can use string data type to circumvent this
    - are the inputs floats, decimals, integers?
    - are there always two inputs?
What are the desired outputs
    - integer or float?
    - string?
Can the outputs be determined from the inputs → do I have enough information to solve the problem?
    - if two inputs are given, yes
    - if only one input --> no
        - add zero? return undefined, null? error?
How to label important parts of data / information
    - simple example, simple to label
*/


// Build concrete examples

/* 
    - start very simple test cases, progress to complex test cases
    - use edge cases (i.e emplty inputs)
    - use invalid inputs
        - more useful in real world
*/


// example: write a function that takes a string and returns counts of each character in a string

/* 
charCount('aaaa') --> return { a: 4 }
    - should it return letter counts that arent there (i.e { b: 0, c: 0 })

charCount('hello') --> return { h: 1, e: 1, l: 2, o: 1 }

should we account for spaces? numbers? underscores?
should we differentiate between upper and lower case?

what about empty string?
what about inputs of other data types?
*/


// Break it down

/*
    write out steps you're going to take in coding

    function charCount (string) {
        // initialize object to return
        // loop over string
            // lowercase everything
            // check if char is a number or letter
                // if not, ignore
                // if yes... 
                    // see if key exists
                        // if not, create key with count 1
                        // if yes, add to existing value
        // return an object with counts of alphanumeric components (characters are keys, count is value) -- ignore casing

    }
*/


// Solve/Simplify

/*
function charCount (string) {

    // initialize object to return
    let result = {};

    // loop over string
    for (i = 0; i < string.length; i++) {

        // check if char is a number or letter
            // if not, ignore
            // if yes...
                // lowercase everything
                let char = string[i].toLowerCase();
                    // see if key exists
                    if (result[char] > 0) {
                        // if yes, add to existing value
                        result[char]++
                    } else {
                        // if not, create key with count 1
                        result[char] = 1
                    }

                        
        } 
    // return an object with counts of alphanumeric components (characters are keys, count is value) -- ignore casing

    return result; 

}
*/



// Refactor

/* 

first rendition

function charCount (string) {

    // initialize object to return
    let result = {};

    // loop over string
    for (i = 0; i < string.length; i++) {

        // lowercase everything
        let char = string[i].toLowerCase();

        // check if char is a number or letter
        if (/[a-z0-9]/.test(char)) { // can also use charCodes to determine if alphanumeric and improve performance
            // if yes...
                // see if key exists
                if (result[char] > 0) {
                    // if yes, add to existing value
                    result[char]++
                } else {
                    // if not, create key with count 1
                    result[char] = 1
                }
        }
        // if not, ignore

                        
    } 

    // return an object with counts of alphanumeric components (characters are keys, count is value) -- ignore casing

    return result;
}
*/

// final


function charCount (string) {
    let result = {};
    for (let char of string) {
        if (isAlphaNumeric(char)) {
            char = char.toLowerCase();
            result[char] = ++result[char] || 1
        }
    }

    
    return result;
}

function isAlphaNumeric (char) {
    let code = char.charCodeAt(0)
    if (!(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123)) { // lower alpha (a-z)
       return false;
    }
    return true;
}

console.log(charCount('Hello hi'))