import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const radios = document.querySelectorAll('input[name=state]');
const delayInput = document.querySelector('input[name=delay]');
let delay = 0;
const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  delay = Number(delayInput.value);
  console.log('delay', delay);
  const promise = new Promise((res, rej) => {
    showAlert(radios[0].checked);
  });
}
function showAlert(ok) {
  setTimeout(() => {
    iziToast.show({
      title: `${ok ? 'OK' : 'Error'}`,
      titleColor: '#fff',
      icon: `${ok ? 'ico-success' : 'ico-error'}`,
      iconColor: '#fff',
      message: `${ok ? 'Fullfilled' : 'Rejected'} promise in ${delay}ms`,
      messageColor: '#fff',
      color: `${ok ? '#59a10d' : '#ef4040'}`,
      position: 'topRight',
    });
  }, delay);
}

