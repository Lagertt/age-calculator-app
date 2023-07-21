function validationForm(date) {
  let isOk = true;

  const day = Number(date.day);
  const month = Number(date.month);
  const year = Number(date.year);

  const fieldsetDay = document.getElementById('dayField');
  const fieldsetMonth = document.getElementById('monthField');
  const fieldsetYear = document.getElementById('yearField');

  if (day < 1 || day > 31) {
    if (date.day === '') printError('This field is required', fieldsetDay);
    else printError('Must be a valid day', fieldsetDay);
    isOk = false;
  } else {
    deleteError(fieldsetDay);
  }

  if (month < 1 || month > 12) {
    if (date.month === '') printError('This field is required', fieldsetMonth);
    else printError('Must be a valid month', fieldsetMonth);
    isOk = false;
  } else {
    deleteError(fieldsetMonth);
  }

  if (year < 1 || year > new Date().getFullYear()) {
    if (date.year === '') printError('This field is required', fieldsetYear);
    else printError('Must be in the past', fieldsetYear);
    isOk = false;
  } else {
    deleteError(fieldsetYear);
  }

  if (isOk) {
    const copyDate = new Date(year, month - 1, day);
    if (copyDate.getMonth() !== month - 1) {
      printError('Must be a valid date', fieldsetDay);
      fieldsetYear.classList.add('error');
      fieldsetMonth.classList.add('error');
      isOk = false;
    }
    if (copyDate > new Date()) {
      printError('Must be in the past', fieldsetDay);
      fieldsetYear.classList.add('error');
      fieldsetMonth.classList.add('error');
      isOk = false;
    }
  }

  return isOk;
}

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
