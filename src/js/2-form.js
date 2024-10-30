const formData = { email: '', message: '' };
const KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', handleInputs);
form.addEventListener('submit', handleSubmit);
populateInputs();

function handleInputs(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}
function handleSubmit(e) {
  e.preventDefault();
  if (form['email'].value === '' || form['message'].value === '') {
    return alert('Fill please all fields');
  }
  console.log(formData);
  form.reset();
  formData.email = "";
  formData.message = "";
  localStorage.removeItem(KEY);
}
function populateInputs() {
  const curMessage = localStorage.getItem(KEY);
  if (curMessage) {
    const { email, message } = JSON.parse(curMessage);
    formData['email'] = email ?? '';
    formData['message'] = message ?? '';
  }
  form["email"].value = formData["email"];
  form["message"].value = formData["message"];
}
