import _ from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageArea = document.querySelector('textarea');

const LS_FORM_KEY = 'feedback-form-state';

window.addEventListener('load', handlePageLoad);

const existingObjJSON = localStorage.getItem(LS_FORM_KEY);
const existingObj = existingObjJSON
  ? JSON.parse(existingObjJSON)
  : { email: '', message: '' };

function handlePageLoad() {
  if (Object.keys(existingObj).length !== 0) {
    emailInput.value = existingObj.email;
    messageArea.value = existingObj.message;
  } else {
    return;
  }
}

form.addEventListener('input', _.throttle(handleInput, 500));

function handleInput(event) {
  const fieldName = event.target.getAttribute('name');

  if (fieldName === 'email' || fieldName === 'message') {
    existingObj[fieldName] = event.target.value.trim();

    localStorage.setItem(LS_FORM_KEY, JSON.stringify(existingObj));
  }
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if (emailInput.value.trim() === '' || messageArea.value.trim() === '') {
    window.alert('Seems like some fields are empty, please, fill in them!');
    return;
  }
  const submitData = {
    email: emailInput.value.trim(),
    message: messageArea.value.trim(),
  };
  console.log(submitData);
  localStorage.removeItem(LS_FORM_KEY);

  event.currentTarget.reset();
  for (key in submitData) {
    delete submitData[key];
  }
  /*emailInput.value = '';
  messageArea.value = '';*/
}
