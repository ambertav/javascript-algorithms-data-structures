function getDigit (num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10; // math.abs in case negative number is passed
}

function digitCount (num) {
    if (num === 0) return 1; // otherwise would return infinity for input of 0
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits (nums) {
    let maxDigits = 0;
    for (i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}


function radixSort (nums) {
    let maxDigitCount = mostDigits(nums);
    for (k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({length: 10}, () => []); // creates an array of subarrays, the index corresponds to the digit, the nested arrays contain the numbers from the input
        for (i = 0; i < nums.length; i++) {
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

console.log(radixSort([23, 345, 5467, 12, 2345, 9852]));