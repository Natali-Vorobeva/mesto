const selectorsList = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  validStyleInputClass: 'inputValidStyle',
  validStyleErrorClass: 'errorValidStyle',
}

const showInputError = (formElement, inputElement, errorMessage, selectorsList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsList.errorClass);
};

const hideInputError = (formElement, inputElement, selectorsList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsList.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.add(selectorsList.validStyleErrorClass);
};

const isValidStyle = (inputElement, selectorsList) => {
  if(!inputElement.validity.valid) {
  inputElement.classList.add(selectorsList.validStyleInputClass);
  return;
  };
};

const checkInputValidity = (formElement, inputElement, selectorsList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

formElement.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonState(inputsList, buttonElement);
        }, 0);
      });

const setEventListeners = (formElement, selectorsList) => {
  const inputsList = Array.from(formElement.querySelectorAll(selectorsList.inputSelector));
  const buttonElement = formElement.querySelector(selectorsList.submitButtonSelector);
  toggleButtonState(inputsList, buttonElement);
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputsList, buttonElement);
      isValidStyle(inputElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

function hasInvalidInput(inputsList, selectorsList) {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputsList, buttonElement, selectorsList) {
  if(hasInvalidInput(inputsList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(selectorsList.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectorsList.inactiveButtonClass);
  }
}


const enableValidation = (selectorsList) => {
  const formsList = Array.from(document.querySelectorAll(selectorsList.formSelector));
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation(selectorsList);


