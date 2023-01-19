class Card {
  constructor({item,
     handleCardClick},
      templateSelector ) {
    this._name = item.name;
    this._link = item.link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
    .querySelector(this._template)
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

    this._newCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    }

    generate() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;
