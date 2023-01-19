export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escapeClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escapeClose);
  };

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escapeClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    const closeOverlaySelector = this._popup.querySelector('.popup__container');
    closeOverlaySelector.addEventListener('mousedown', (evt) => {
      if (!evt.target.classList.contains('popup__container')) {
        return;
      }
      if (evt.target.classList.contains('popup__container')) {
        this.closePopup();
      }
    });

    const closeButtonSelector = this._popup.querySelector('.popup__image-close');
    closeButtonSelector.addEventListener('mousedown', () => {
      this.closePopup();
    });
  }
}

