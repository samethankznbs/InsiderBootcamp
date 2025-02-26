function collatzSequenceLength(n) {
    let count = 0;
    
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        count++;
    }
    
    return count + 1; 
}

function findLongestCollatz(limit) {
    let longestStart = 0;
    let longestLength = 0;

    for (let i = 1; i < limit; i++) {
        let length = collatzSequenceLength(i);
        
        if (length > longestLength) {
            longestLength = length;
            longestStart = i;
        }
    }
    
    return longestStart;
}

console.log(findLongestCollatz(1000000));
