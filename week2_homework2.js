function collatzSequenceLength(n, memo) {
    let count = 0;
    let original = n;
    while (n !== 1 && !(n in memo)) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        count++;
    }
    memo[original] = count + (memo[n] || 0);
    return memo[original];
}

function findLongestCollatz(limit) {
    let longestStart = 0;
    let longestLength = 0;
    let memo = {1: 1};
    
    for (let i = 1; i < limit; i++) {
        let length = collatzSequenceLength(i, memo);
        if (length > longestLength) {
            longestLength = length;
            longestStart = i;
        }
    }
    
    return longestStart;
}

console.log(findLongestCollatz(1000000));
