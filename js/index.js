const formElement = document.querySelector('.form');
formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  blurInputs(formElement);

  let ObjDate = getDateValues(formElement);

  if (validationForm(ObjDate)) {
    // если форма прошла валидацию
    const age = calcDiff(ObjDate); // считаем возраст
    printAge(getResultFields(), age); // выводим его
  } else {
    printAge(getResultFields()); // иначе выводим пустые значения в полях
  }
});

// убирает фокус со всех Input в форме, полученной на входе
function blurInputs(form) {
  const inputs = form.querySelectorAll('.form__input');
  inputs.forEach((input) => {
    input.blur();
  });
}

// создаёт объект вида {year: 0, month: 0, day: 0} со значениями, введёнными пользователем в форме
function getDateValues(form) {
  const formData = new FormData(form);
  let inputObjDate = {};
  inputObjDate.year = formData.get('year');
  inputObjDate.month = formData.get('month');
  inputObjDate.day = formData.get('day');

  return inputObjDate;
}

// возвращает объект, в котором ключи - названия полей (год, месяц, день), а значения - соответствующие им html элементы
function getResultFields() {
  const fieldYear = document.getElementById('yearRes');
  const fieldMonth = document.getElementById('monthRes');
  const fieldDay = document.getElementById('dayRes');

  return { year: fieldYear, month: fieldMonth, day: fieldDay };
}

// получает html элементы и вставляет в них значения возраста, если age не передан, заполняет прочерками
function printAge(fields, age) {
  for (let field in fields) {
    fields[field].textContent = age !== undefined ? age[field] : '- -';
  }
}

// получает объект вида {year: 0, month: 0, day: 0} с датой, введённой пользователем
// возвращает объект такого же вида с разницой между введённой датой и текущей
function calcDiff(inputObjDate) {
  const inputDate = new Date(+inputObjDate.year, +inputObjDate.month - 1, +inputObjDate.day); // переводим переданный объект в формат даты js
  const ageDate = new Date(new Date() - inputDate); // считаем разницу между текущей датой и введённой (возраст)

  // переводим полученный результат из формата даты в объект
  const nullDate = new Date(0);
  year = ageDate.getFullYear() - nullDate.getFullYear();
  month = ageDate.getMonth() - nullDate.getMonth();
  day = ageDate.getDate() - nullDate.getDate();

  return { day, month, year };
}

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
