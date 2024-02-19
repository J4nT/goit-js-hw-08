import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const email = form.querySelector("input[name='email']");
const message = form.querySelector("input[name='message]");

const keyStorage = 'feedback-form-state';
const saveToLocalStorage= throttle(() => {
  const formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
    localStorage.setItem(keyStorage, JSON.stringify(formData));
}, 500);

form.addEventListener('input', saveToLocalStorage);

const loadStorage= () => {
  const storedData = localStorage.getItem(keyStorage);
  if (storedData) {
    try {
      const state = JSON.parse(storedData);
      email.value = state.email;
      message.value = state.message;
    } catch (error) {
      console.log(error.message);
    }
  }
};

loadStorage(); 

form.addEventListener('submit', event => {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    alert('Please fill all fields!');
  } else {
    console.log('Form Data:', {
      email: email.value,
      message: message.value,
    });
  }
  localStorage.removeItem(keyStorage);
  form.reset();
});