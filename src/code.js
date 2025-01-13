const crypto = require('crypto');

const generateProductCode = (name) => {
    const hash = crypto.createHash('md5').update(name).digest('hex').slice(0, 8);
    const findLongestIncreasingSubstrings = (str) => {
        let maxLen = 0;
        let substrings = [];
        let current = str[0] || '';

        for (let i = 1; i <= str.length; i++) {
            if (i === str.length || str[i] <= str[i - 1]) {
                if (current.length > maxLen) {
                    maxLen = current.length;
                    substrings = [current];
                } else if (current.length === maxLen) {
                    substrings.push(current);
                }
                current = str[i] || '';
            } else {
                current += str[i];
            }
        }
        return substrings;
    };

    const substrings = findLongestIncreasingSubstrings(name.toLowerCase());
    const startIndex = name.indexOf(substrings[0]);
    const endIndex = startIndex + substrings[0].length - 1;
    return `${hash}-${startIndex}${substrings.join('')}${endIndex}`;
};

module.exports = { generateProductCode };