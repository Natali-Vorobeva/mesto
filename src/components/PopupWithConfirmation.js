import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
	constructor({ popupSelector }) {
		super(popupSelector);
		this._form = this._popup.querySelector('form');
	}

	submitCallBack(removing) {
		this._handleSubmit = removing;
	}

	// удаление карточки по нажатию на submit
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._handleSubmit();
		});
	}
}
