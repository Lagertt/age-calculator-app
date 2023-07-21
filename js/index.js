function printError(name, element) {
  let error = element.querySelector('.form__error');
  error.textContent = name;
  element.classList.add('error');
}

function deleteError(element) {
  let error = element.querySelector('.form__error');
  error.textContent = '';
  element.classList.remove('error');
}
