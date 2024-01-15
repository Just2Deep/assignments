import React, { useState, useMemo } from "react";
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
    const [items, setItems] = useState([
        { name: "Chocolates", value: 10 },
        { name: "Chips", value: 20 },
        { name: "Onion", value: 30 },
        { name: "Tomato", value: 30 },
        // Add more items as needed
    ]);

    // Your code starts here
    const totalValue = useMemo(() => {
        let total = 0;

        for (let item of items) {
            total += +item.value;
        }

        return total;
    }, [items]);
    // Your code ends here

    const addItem = () => {
        setItems([...items, { name, value }]);
    };
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - Price: ${item.value}
                    </li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
            <label htmlFor="item1">Item</label>
            <input
                type="text"
                id="item1"
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="values">Value</label>
            <input
                type="number"
                id="values"
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={addItem}>add item</button>
        </div>
    );
};
