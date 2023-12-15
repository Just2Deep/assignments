/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    // let a = 0;

    return new Promise((res, rej) => {
        // setTimeout(() => res(), milliseconds);
        let a = 0;
        const time = (milliseconds / 90) * 100000000;
        for (let i = 0; i < time; i++) {
            a += 1;
        }
        res();
    });
}

module.exports = sleep;
