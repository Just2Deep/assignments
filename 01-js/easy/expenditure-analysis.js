/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
    let output = [];
    let categories = {};

    for (let t of transactions) {
        if (categories[t["category"]] == undefined) {
            categories[t["category"]] = t["price"];
        } else {
            categories[t["category"]] += t["price"];
        }
    }

    for (let a of Object.keys(categories)) {
        let obj = {
            category: a,
            totalSpent: categories[a],
        };
        output.push(obj);
    }

    return output;
}

module.exports = calculateTotalSpentByCategory;
