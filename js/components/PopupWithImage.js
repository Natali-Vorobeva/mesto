import Popup from "../components/Popup.js";

const popupShowImage = document.querySelector('.popup__show-image');
const showDescription = document.querySelector('.popup__description-name');

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = popupShowImage;
    this._popupDescription = showDescription;
  }

  openPopup(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupDescription.textContent = name;
    super.setEventListeners();
    super.openPopup();
  }
}
