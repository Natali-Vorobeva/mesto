import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._inputs = this._form.querySelectorAll('.popup__input');
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

  setEventListeners() {
    super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
		});
	}
}
