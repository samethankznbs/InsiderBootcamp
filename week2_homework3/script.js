let countdown;
let timeLeft;
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const countdownDisplay = document.getElementById('countdownDisplay');

function validateInput() {
    let value = timeInput.value.trim(); 
    if ( parseInt(value) < 1) {
        timeInput.value = 1; 
    }
}

timeInput.addEventListener('input', validateInput);

startButton.addEventListener('click', () => {
    clearInterval(countdown);
    validateInput(); 
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
    validateInput();
    countdownDisplay.textContent = `Süre: ${timeInput.value}`;
});
