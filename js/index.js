import Card from './Card.js';
import { FormValidator, selectorsList } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

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

const initialCards = [
  {
    link: 'https://avatars.mds.yandex.net/i?id=817d5c5bd6d2238a76ac0c96a0dbad1d32af1f27-5492883-images-thumbs&n=13&exp=1',
    name: 'Ладога',
  },
  {
    link: 'https://avatars.mds.yandex.net/i?id=8408a70f60f9813e370886cb4d821b22dce1ec0c-7015819-images-thumbs&n=13&exp=1',
    name: 'Кронштадт',
  },
  {
    link: 'https://supersnimki.ru/images/pub/2018/10/23/ba4783b0-d6d4-11e8-b397-872fee1cf78a_original.jpg?969419',
    name: 'Петергоф',
  },
  {
    link: 'https://uniticket.ru/wp-content/uploads/2021/12/Ostrova-ozera-Vuoksa5.jpg',
    name: 'Вуокса',
  },
  {
    link: 'https://supersnimki.ru/images/pub/2022/07/12/f0b6221d-0222-11ed-bc1f-90a7eceb5bed_original.jpg?395524',
    name: 'Соловецкие острова',
  },
  {
    link: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/travel/95/2017-1000x830.jpg',
    name: 'Санкт-Петербург',
  }
];

//  Закрытие попапов
export const popups = document.querySelectorAll('.popup');
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
const card = new Card(dataCard)
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
