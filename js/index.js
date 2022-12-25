import Card from './Card.js';
import { FormValidator, selectorsList } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import { initialCards } from './constants.js';

const profilePopup = document.querySelector('.popup_form_personal');
const openPopupPersonal = document.querySelector('.personal-page__open');
const formAccount = document.forms['account'];
const username = document.querySelector('.personal-page__username');
const about = document.querySelector('.personal-page__about');
const popupUserName = document.querySelector('.popup__input_data_name');
const popupAbout = document.querySelector('.popup__input_data_about');

const cardPopup = document.querySelector('.popup_form_place');
const openPopupPlace = document.querySelector('.personal-page__button');
const formCard = document.forms['place'];
const inputCardName = document.querySelector('.popup__input_name_card');
const inputCardLink = document.querySelector('.popup__input_address_image');

const cardContainer = document.querySelector('.gallery');

//  Закрытие попапов
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__container')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__image-close')) {
      closePopup(popup);
    }
  });
});

// Добавление карточки
const renderCard = (dataCard) => {
  const card = new Card(dataCard, '#card-template');
  cardContainer.prepend(card.getView());
}

initialCards.forEach(renderCard);

// Функции отправки форм
function handleSubmitFormAccount(evt) {
  evt.preventDefault();
  username.textContent = popupUserName.value;
  about.textContent = popupAbout.value;
  closePopup(profilePopup);
}

const handleSubmitAddCard = (evt) => {
  evt.preventDefault();
  closePopup(cardPopup);
  renderCard({ link: inputCardLink.value, name: inputCardName.value });
  evt.target.reset();
};

const validationFormAccount = new FormValidator(selectorsList, formAccount);
validationFormAccount._enableValidation();
const validationFormAddCard = new FormValidator(selectorsList, formCard);
validationFormAddCard._enableValidation();

// Слушатели
formAccount.addEventListener('submit', handleSubmitFormAccount);
formCard.addEventListener('submit', handleSubmitAddCard);
openPopupPersonal.addEventListener('click', () => {
  popupUserName.setAttribute('value', username.textContent);
  popupAbout.setAttribute('value', about.textContent);
  openPopup(profilePopup);
});
openPopupPlace.addEventListener('click',  () => {
  openPopup(cardPopup);
});
