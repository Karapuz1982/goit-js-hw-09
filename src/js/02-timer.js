
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

// Ініціалізуємо flatpickr з опціями
const picker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Перевіряємо, чи вибрана дата в майбутньому
    if (selectedDate < new Date()) {
      Notiflix.Report.warning("Warning", "Please choose a date in the future", "OK");
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
});

// Функція для форматування числа з провідним нулем
function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

// Функція для розрахунку часу
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

// Оновлюємо значення таймера
function updateTimer(endTime) {
  const currentTime = new Date();
  const timeDiff = endTime - currentTime;

  if (timeDiff <= 0) {
    clearInterval(timerInterval);
    Notiflix.Notify.success("Time's up!");
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Обробник натискання на кнопку "Start"
document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = picker.selectedDates[0];

  if (!selectedDate) {
    return;
  }

  const endTime = selectedDate.getTime();

  const timerInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);
});
