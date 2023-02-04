import './index.css';

import {
  popupAvatar,
  formAvatar,
  avatar,
  openPopupPersonal,
  formAccount,
  name,
  about,
  popupUserName,
  popupAbout,
  openPopupPlace,
  formCard
} from '../utils/constants.js';

import Card from '../components/Card.js';
import { FormValidator, selectorsList } from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '032be63d-a621-4ef4-91b0-cc2afa2b0165',
    'Content-Type': 'application/json'
  }
};

const api = new Api(configApi);

// Загрузка готовых карточек и данных о пользователе с сервера

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userInfo.setUserInfo(me);
    userId = me._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {});
let userId;

// Функция создания новой карточки

const imagePopup = new PopupWithImage('.popup_card_image');

const createCard = (item) => {
  const card = new Card({

    item: item,
    userId: userId,
    templateSelector: '.template',

    handleCardClick: (name, link) => {
      imagePopup.openPopup(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.openPopup();
      deleteCardPopup.submitCallBack(() => {
        api.
          deleteCard(cardId)
          .then(() => {
            deleteCardPopup.closePopup();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api
        .setLike(cardId)
        .then((item) => {
          card.handleLikeCard(item);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((item) => {
          card.handleLikeCard(item);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.generate();
  return cardElement;
};
imagePopup.setEventListeners();


//  Добавление карточек

const cardList = new Section({
  renderer: (item) => {
    cardList.addInitialCards(createCard(item));
  },
}, '.gallery');



// Отправка формы Аккаунт

const userInfo = new UserInfo({ name, about, avatar });
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_form_personal',
  handleFormSubmit: (formData) => {
    editProfilePopup.loading(true);
    api
      .editUserInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        editProfilePopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      })
  }
});
editProfilePopup.setEventListeners();

// Отправка формы аватарки

const submitFormAvatar = new PopupWithForm({
  popupSelector: '.popup_form_avatar',
  handleFormSubmit: (formData) => {
    submitFormAvatar.loading(true);
    api
      .changeUserAvatar(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        submitFormAvatar.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        submitFormAvatar.loading(false);
      })
  }
});
submitFormAvatar.setEventListeners();

// Отправка формы добавления новой карточки

const submitFormAddCard = new PopupWithForm({
  popupSelector: '.popup_form_place',
  handleFormSubmit: (data) => {
    submitFormAddCard.loading(true);
    api
      .addCard(data)
      .then((item) => {
        cardList.addItem(createCard(item));
        submitFormAddCard.closePopup();
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        submitFormAddCard.loading(false);
      });
  }
});
submitFormAddCard.setEventListeners();

// Создаем попап подтверждения удаления карточки

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup-delete-place'
});
deleteCardPopup.setEventListeners();

//  Слушатели

popupAvatar.addEventListener('mouseout', () => {
  const editAvatar = document.querySelector('.personal-page__avatar-container-overlay');
  editAvatar.style.transition = "opacity .7s ease";
  editAvatar.style.opacity = "0";
});

popupAvatar.addEventListener('mouseover', () => {
  const editAvatar = document.querySelector('.personal-page__avatar-container-overlay');
  editAvatar.style.transition = 'opacity .7s ease';
  editAvatar.style.opacity = '1';
});

popupAvatar.addEventListener('click', () => {
  submitFormAvatar.openPopup();
});

openPopupPersonal.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupUserName.setAttribute('value', userData.name);
  popupAbout.setAttribute('value', userData.about);
  editProfilePopup.openPopup();
});

openPopupPlace.addEventListener('click', () => {
  submitFormAddCard.openPopup();
});

// Валидация форм
const validationFormAvatar = new FormValidator(selectorsList, formAvatar);
validationFormAvatar.enableValidation();
const validationFormAccount = new FormValidator(selectorsList, formAccount);
validationFormAccount.enableValidation();
const validationFormAddCard = new FormValidator(selectorsList, formCard);
validationFormAddCard.enableValidation();
