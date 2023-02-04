import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.popup__save');
  }

  _getInputValues() {
    this._formValues = {};
		this._inputs.forEach(input =>{
      this._formValues[input.name] = input.value;
    });

		return this._formValues;
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
		});
	}
}
