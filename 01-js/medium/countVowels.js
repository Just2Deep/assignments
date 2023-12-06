/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let total = 0;
    str = str.toLowerCase();
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (["a", "e", "i", "o", "u"].includes(element)) {
            total += 1;
        }
    }
    return total;
}

module.exports = countVowels;
