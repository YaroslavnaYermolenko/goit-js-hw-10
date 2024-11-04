import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  maxDate: Date.now() + 100 * 24 * 60 * 60 * 1000,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      btnStart.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};
flatpickr('input#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
    this.intervalId = null;
    this.init();
  }
  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    document.getElementById("datetime-picker").disabled = false;
    this.init();
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    btnStart.disabled = true;
    document.getElementById("datetime-picker").disabled = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userSelectedDate - currentTime;
      if(deltaTime <= 0){
        this.stop();
        console.log('userSelectedDate',userSelectedDate);
        iziToast.success({
          title: 'Success',
          message: 'Time has come!',
          position: 'topRight',
        });
        return;
      }
      const time = this.convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}
const timer = new Timer({ onTick: updateClockface });

const btnStart = document.querySelector('button[data-start]');
btnStart.addEventListener('click', timer.start.bind(timer));
btnStart.disabled = true;
function updateClockface(timerValues) {
  for (const key of Object.keys(timerValues)) {
    document.querySelector(`span[data-${key}]`).textContent = timerValues[key];
  }
}