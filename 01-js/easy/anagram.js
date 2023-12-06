/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    s1 = str1.toLowerCase().split("").sort();
    s2 = str2.toLowerCase().split("").sort();

    if (s1.length != s2.length) {
        return false;
    }
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] != s2[i]) {
            return false;
        }
    }
    return true;
}

module.exports = isAnagram;
