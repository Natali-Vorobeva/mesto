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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsList.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsList.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.add(selectorsList.validStyleErrorClass);
};

const isValidStyle = (inputElement) => {
  if(!inputElement.validity.valid) {
  inputElement.classList.add(selectorsList.validStyleInputClass);
  return;
  };
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const setEventListeners = (formElement) => {
  const inputsList = Array.from(formElement.querySelectorAll(selectorsList.inputSelector));
  const buttonElement = formElement.querySelector(selectorsList.submitButtonSelector);
  toggleButtonState(inputsList, buttonElement);
	formElement.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonState(inputsList, buttonElement);
        }, 0);
      });

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputsList, buttonElement);
      isValidStyle(inputElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

function hasInvalidInput(inputsList) {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputsList, buttonElement, ) {
  if(hasInvalidInput(inputsList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(selectorsList.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectorsList.inactiveButtonClass);
  }
}


const enableValidation = () => {
  const formsList = Array.from(document.querySelectorAll(selectorsList.formSelector));
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation(selectorsList);


