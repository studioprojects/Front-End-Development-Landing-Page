const countdown = document.querySelector('.countdown')

// set end date
const startDate = new Date("August 1, 2022 12:00:00").getTime();

// update every 1000ms
const timer = setInterval(() => {
    // today's date and time in ms
    const now = new Date().getTime();
    // difference in time time between start and end date
    const difference = startDate - now;
    // time calc algorithms
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);

    // display timer
    countdown.innerHTML = `
            <div>${days}<span>DAYS</span></div>
            <div>${hours}<span>HOURS</span></div>
            <div>${mins}<span>MINS</span></div>
            <div>${secs}<span>SECS</span></div>
        `;

    // check to see if the lauch date has passed
    if (difference < 0) {
        clearInterval(timer);
        countdown.style.color = '#17a2b8';
        countdown.innerHTML = 'LAUNCHED!';
    }

}, 1000)