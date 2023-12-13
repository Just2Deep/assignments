// Write code to display actual time

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function time() {
    const date = new Date();
    firstTimeFormat(date);
    secondTimeFormat(date);
}

function firstTimeFormat(date) {
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    console.log(`${h}:${m}:${s}`);
}

function secondTimeFormat(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Check whether AM or PM
    let meridian = hours >= 12 ? "PM" : "AM";

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    console.log(`${hours}:${minutes}:${seconds} ${meridian}`);
}

setInterval(time, 1000);
