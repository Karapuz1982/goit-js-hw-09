const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');



let intervalId;

const startColorChange = () => {
    startButton.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
};

const stopColorChange = () => {
  startButton.disabled = false; 
  clearInterval(intervalId);
};

const changeBackgroundColor = () => {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
};

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

