import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__show-image');
    this._popupDescription = this._popup.querySelector('.popup__description-name');
  }

  openPopup(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupDescription.textContent = name;
    super.openPopup();
  }
}
