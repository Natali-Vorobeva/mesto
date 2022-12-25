import { openPopup } from './utils.js';
const popupImage = document.querySelector('.popup_card_image');
const popupShowImage = document.querySelector('.popup__show-image');
const showDescription = document.querySelector('.popup__description-name');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(templateSelector);
  }

  _getTemplate() {
    const card = this._template
    .content
    .querySelector('.gallery__card-body')
    .cloneNode(true);

    return card;
  }

  _setData() {
    const nameElement = this._newCard.querySelector('.gallery__name');
    nameElement.textContent = this._name;
    const imageElement = this._newCard.querySelector('.gallery__image');
    imageElement.src = this._link;
    imageElement.alt = `Вид на  ${this._name}`;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _favouritesCard() {
    this._newCard.querySelector('.gallery__image-favourites-liked').classList.toggle('active');
  }

  _openPopupImage() {
      popupShowImage.src = this._link;
      popupShowImage.alt = `Вид на  ${this._name}`;
      showDescription.textContent = this._name;
      openPopup(popupImage);
    };

    _setEventListeners() {
    const deleteBtn = this._newCard.querySelector('.gallery__delete');
    deleteBtn.addEventListener('click', (evt) => {
      this._deleteCard();
      evt.stopPropagation();
    });

    const favouritesButton = this._newCard.querySelector('.gallery__button-favourites');
    favouritesButton.addEventListener('click', (evt) => {
      this._favouritesCard();
      evt.stopPropagation();
    });
    this._newCard.addEventListener('click', () => { this._openPopupImage() });
    }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}
export default Card;
