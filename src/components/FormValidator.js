export default class FormValidator {
  constructor(selectorsList, form) {
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
    this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputEl, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputEl) {
    const errorElement = this._form.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.add(this._validStyleErrorClass);
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
    return this._inputsList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  resetValidation() {
    this.disableButtonState()
    this._inputsList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });

  }

  disableButtonState() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

    _toggleButtonState(inputsList) {
    if(this._hasInvalidInput(inputsList)) {
      this.disableButtonState();
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this.resetValidation();
    this._inputsList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValidStyle(inputEl);
        this._checkInputValidity(inputEl);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  };
};
