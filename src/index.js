import '../pages/index.css';

import Card from '../js/components/Card.js';
import { FormValidator, selectorsList } from '../js/components/FormValidator.js';
import { initialCards } from '../js/utils/constants.js';
import Popup from '../js/components/Popup.js';
import UserInfo from '../js/components/UserInfo.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';

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
  userInfo.getUserInfo();
  const closePersonal = new Popup('.popup_form_personal');
  closePersonal.closePopup();
  const disableButton = new FormValidator(selectorsList, formAccount);
  disableButton.disableButtonState();
  }
});
editProfilePopup.setEventListeners();

openPopupPersonal.addEventListener('click', () => {
  userInfo.setUserInfo();
  const openPersonal = new Popup('.popup_form_personal');
  openPersonal.openPopup();
  openPersonal.setEventListeners();
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
  const placePopupOpen = new Popup('.popup_form_place');
  placePopupOpen.openPopup();
  placePopupOpen.setEventListeners();
});

  // Валидация форм
const validationFormAccount = new FormValidator(selectorsList, formAccount);
validationFormAccount.enableValidation();
const validationFormAddCard = new FormValidator(selectorsList, formCard);
validationFormAddCard.enableValidation();




