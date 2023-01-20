import '../pages/index.css';

import Card from '../src/components/Card.js';
import { FormValidator, selectorsList } from '../src/components/FormValidator.js';
import { initialCards } from '../src/utils/constants.js';
import UserInfo from '../src/components/UserInfo.js';
import Section from '../src/components/Section.js';
import PopupWithImage from '../src/components/PopupWithImage.js';
import PopupWithForm from '../src/components/PopupWithForm.js';

const openPopupPersonal = document.querySelector('.personal-page__open');
const formAccount = document.forms['account'];
const username = document.querySelector('.personal-page__username');
const about = document.querySelector('.personal-page__about');

const openPopupPlace = document.querySelector('.personal-page__button');
const formCard = document.forms['place'];

const imagePopup = new PopupWithImage('.popup_card_image');

// Функция создания карточки
const createCard = (item) => {
  const card = new Card({
    item: item,
    handleCardClick: (name, link) => {
      imagePopup.openPopup(name, link);
      imagePopup.setEventListeners();

    }}, '.template');
  const cardElement = card.generate();
  return cardElement;
};

// Добавление карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.gallery');
cardList.renderItems();

// Отправка формы Аккаунт
const userInfo = new UserInfo( { username, about } );
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_form_personal',
  handleFormSubmit: () => {
  userInfo.setUserInfo();
  editProfilePopup.closePopup();
  }
});
editProfilePopup.setEventListeners();

openPopupPersonal.addEventListener('click', () => {
  userInfo.getUserInfo();
  editProfilePopup.openPopup();
  });

// Отправка формы добавления новой карточки
const submitFormAddCard = new PopupWithForm({
  popupSelector: '.popup_form_place',
  handleFormSubmit: (formData) => {
    cardList.addItem(createCard(formData));
    submitFormAddCard.closePopup();
  }
});
submitFormAddCard.setEventListeners();

openPopupPlace.addEventListener('click',  () => {
  submitFormAddCard.openPopup();
});

  // Валидация форм
const validationFormAccount = new FormValidator(selectorsList, formAccount);
validationFormAccount.enableValidation();
const validationFormAddCard = new FormValidator(selectorsList, formCard);
validationFormAddCard.enableValidation();




