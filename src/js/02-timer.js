
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

    if (selectedDate < new Date()) {
      Notiflix.Report.warning("Warning", "Please choose a date in the future", "OK");
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const picker = flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function updateTimer(endDate) {
  const currentTime = new Date().getTime();
  const timeRemaining = endDate - currentTime;

  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    document.querySelector('[data-start]').disabled = false;
    Notiflix.Report.success("Time's up!", "The countdown has finished.", "OK");
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

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

let timerInterval;

document.querySelector('[data-start]').addEventListener("click", () => {
  const endDate = picker.selectedDates[0].getTime();
  document.querySelector('[data-start]').disabled = true;
  timerInterval = setInterval(() => updateTimer(endDate), 1000);
});