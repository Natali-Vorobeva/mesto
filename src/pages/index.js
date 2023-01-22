import './index.css';

import Card from '../components/Card.js';
import { FormValidator, selectorsList } from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const openPopupPersonal = document.querySelector('.personal-page__open');
const formAccount = document.forms['account'];
const userName = document.querySelector('.personal-page__username');
const about = document.querySelector('.personal-page__about');
export const popupUserName = document.querySelector('.popup__input_data_name');
export const popupAbout = document.querySelector('.popup__input_data_about');

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
imagePopup.setEventListeners();

// Добавление карточек

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.gallery');
cardList.renderItems();

// Отправка формы Аккаунт

const userInfo = new UserInfo( { userName, about } );

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_form_personal',
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData.userName, userData.about);
    editProfilePopup.closePopup();
  }
});
editProfilePopup.setEventListeners();

openPopupPersonal.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupUserName.setAttribute('value', userData.userName);
  popupAbout.setAttribute('value', userData.about);
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




