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

class FormValidator {
  constructor(selectorsList, form) {
    // this._popupSelector = selectorsList.popupSelector;
    this._formSelector = selectorsList.formSelector;
    this._inputSelector = selectorsList.inputSelector;
    this._submitButtonSelector = selectorsList.submitButtonSelector;
    this._inactiveButtonClass = selectorsList.inactiveButtonClass;
    this._inputErrorClass = selectorsList.inputErrorClass;
    this._errorClass = selectorsList.errorClass;
    this._validStyleInputClass = selectorsList.validStyleInputClass;
    this._validStyleErrorClass = selectorsList.validStyleErrorClass;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputEl.id}-error`);
    console.log(errorElement);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputEl) {
    const errorElement = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    inputEl.classList.add(this._validStyleInputClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  };

  _isValidStyle(inputEl) {
    if(!inputEl.validity.valid) {
      inputEl.classList.add(this._validStyleInputClass);
    return;
    };
  };

  _hasInvalidInput() {
    const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    return inputsList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

    _toggleButtonState(inputsList) {
    if(this._hasInvalidInput(inputsList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners() {
    const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    inputsList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._toggleButtonState();
        this._form.addEventListener('reset', () => {
          setTimeout(() => {
            this._toggleButtonState();
          }, 0);
        });
        this._isValidStyle(inputEl);
        this._checkInputValidity(inputEl);
      });
    });
  }

  _enableValidation() {

    this._setEventListeners();
  };
};

export { FormValidator, selectorsList };
