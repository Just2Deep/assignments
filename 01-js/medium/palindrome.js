/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
    let res = [];
    for (let i = 0; i < str.length; i++) {
        if (![" ", "!", ",", ".", "?"].includes(str[i])) {
            res.push(str[i].toLowerCase());
        }
    }
    let n = [...res];
    n.reverse();

    for (let i = 0; i <= res.length; i++) {
        if (res[i] != n[i]) {
            return false;
        }
    }

    return true;
}

module.exports = isPalindrome;
