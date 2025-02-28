let countdown;
let timeLeft;
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const countdownDisplay = document.getElementById('countdownDisplay');

startButton.addEventListener('click', () => {
    clearInterval(countdown);
    timeLeft = parseInt(timeInput.value);
    countdownDisplay.textContent = `Süre: ${timeLeft}`;
    
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            countdownDisplay.textContent = `Süre: ${timeLeft}`;
        } else {
            clearInterval(countdown);
            countdownDisplay.textContent = 'Süre doldu!';
        }
    }, 1000);
});

resetButton.addEventListener('click', () => {
    clearInterval(countdown);
    countdownDisplay.textContent = `Süre: ${timeInput.value}`;
});
