class Card {
  constructor({
    item,
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteIconClick,
    handleSetLike,
    handleRemoveLike
      }) {
    this._name = item.name;
    this._link = item.link;
    this._template = templateSelector;
    this._userId = userId;
    this._cardId = item._id;
    this._cardOwnerId = item.owner._id;
    this._likes = item.likes;

    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
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



    // Кнопка delete

    deleteCard() {
      this._newCard.remove();
      this._newCard = null;
    }

  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {

      this._deleteBtn.remove();
    }
  }

    // Изменение количества лайков

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.toggle('active');
    }
  }

  handleLikeCard(item) {
    this._likes = item.likes;
    this._likeButton.classList.toggle('active');
    this._likesNumber.textContent = this._likes.length;
  }

  // Слушатели

    _setEventListeners() {
    this._deleteBtn.addEventListener('click', (evt) => {
      this._handleDeleteIconClick(this._cardId);
    });
    this._favouritesButton.addEventListener('click', (evt) => {
      if (this._likeButton.classList.contains('active')) {
        this._handleSetLike(this._cardId);
      } else {
        this._handleRemoveLike(this._cardId);
      }
    });

    const cardImage = this._newCard.querySelector('.gallery__image');
    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    }

    // Сборка карточки

    generate() {
    this._newCard = this._getTemplate();
    this._favouritesButton = this._newCard.querySelector('.gallery__button-favourites');
    this._likeButton = this._newCard.querySelector('.gallery__image-favourites-liked');
    this._deleteBtn = this._newCard.querySelector('.gallery__delete');
    this._likesNumber = this._newCard.querySelector('.gallery__likes-counter');

    this._setData();

    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;
