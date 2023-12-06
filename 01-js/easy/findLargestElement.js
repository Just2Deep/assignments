/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let max = -Infinity;
    if (numbers.length == 0) {
        return;
    }

    for (let i in numbers) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

module.exports = findLargestElement;
