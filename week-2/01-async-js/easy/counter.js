// Counter 01

let count = 0;
function counter() {
    count++;
    console.log(count);
}

// setInterval(counter, 1000);

// Counter 02
let countTwo = 0;
function counterTwo() {
    countTwo++;
    console.log(countTwo);
}

// while (true) {
//     console.log("timeout");
// }
setTimeout(function count() {
    console.log(`${countTwo} sec`);
    countTwo++;
    setTimeout(count, 1000);
}, 1000);
