import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Notify.warning("Please choose a date in the future");
      return;
    }

    const startButton = document.querySelector("[data-start]");
    startButton.removeAttribute("disabled");
  },
};

flatpickr("#datetime-picker", options);

const timer = document.querySelector(".timer");
const daysElement = timer.querySelector("[data-days]");
const hoursElement = timer.querySelector("[data-hours]");
const minutesElement = timer.querySelector("[data-minutes]");
const secondsElement = timer.querySelector("[data-seconds]");
const startButton = document.querySelector("[data-start]");

startButton.addEventListener("click", () => {
  const selectedDate = flatpickr.parseDate(document.querySelector("#datetime-picker").value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
  }

  startButton.setAttribute("disabled", true);

  const intervalId = setInterval(() => {
    const remainingTime = selectedDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      updateTimer(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}