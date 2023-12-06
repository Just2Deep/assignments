/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
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
