const popupPersonal = document.querySelector('.popup_form_personal');
const openPopupPersonal = document.querySelector('.personal-page__open');
const formAccount = document.querySelector('.popup__content_form_account');
const buttonAccount = document.querySelector('#personal-save');
const username = document.querySelector('.personal-page__username');
const about = document.querySelector('.personal-page__about');
const popupUserName = document.querySelector('.popup__input_data_name');
const popupAbout = document.querySelector('.popup__input_data_about');
const closePersonal = document.querySelector('#personal-close');

const popupPlace = document.querySelector('.popup_form_place');
const openPopupPlace = document.querySelector('.personal-page__button');
const formCard = document.querySelector('.popup__content_form_cards');
const inputCardName = document.querySelector('.popup__input_name_card');
const inputCardLink = document.querySelector('.popup__input_address_image');
const closePlace = document.querySelector('#place-close');

const popupCard = document.querySelector('.popup_card_image');
const closePopupCard = document.querySelector('#card-close');

const cardContainer = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.gallery__card-body');

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

// Открытие попапов
openPopupPersonal.addEventListener('click', function () {
  popupPersonal.classList.add('popup_opened');
  popupUserName.setAttribute('value', username.textContent);
  popupAbout.setAttribute('value', about.textContent);
});
openPopupPlace.addEventListener('click', function () {
  popupPlace.classList.add('popup_opened');
});

// Закрытие попапов
closePersonal.addEventListener('click', function () {
  popupPersonal.classList.remove('popup_opened');
});
closePlace.addEventListener('click', function () {
  popupPlace.classList.remove('popup_opened');
});
function closePopupImage() {
  popupCard.classList.remove('popup_opened');
}

//  Удаление карточки
const deleteCardHandler = (evt) => {
  evt.target.closest('.gallery__card-body').remove();
}

// Добавление лайка
const likedCardHandler = (evt) => {
  evt.preventDefault();
  evt.target.classList.toggle('active');
}

// Генерация карточки
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const titleCard = newCard.querySelector('.gallery__name');
  titleCard.textContent = dataCard.name;
  const imageCard = newCard.querySelector('.gallery__image');
  imageCard.setAttribute('src', dataCard.link);

  const showImage = document.querySelector('.popup__show-image');
  const showdescription = document.querySelector('.popup__description-name');

  function showPopupImage() {
    popupCard.classList.add('popup_opened');
    showImage.setAttribute('src', dataCard.link);
    showdescription.textContent = dataCard.name;
  }

  imageCard.addEventListener('click', showPopupImage);
  popupCard.addEventListener('click', closePopupImage);

  const deleteBtn = newCard.querySelector('.gallery__delete');
  deleteBtn.addEventListener('click', deleteCardHandler);

  const favouritesButton = newCard.querySelector('.gallery__button-favourites');
  favouritesButton.addEventListener('click', likedCardHandler);

  return newCard;
}

// Добавление карточки
const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
}

// Рендер всех карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})

// Функции отправки форм
function submitFormAccountHandler(evt) {
  evt.preventDefault();
  username.textContent = popupUserName.value;
  about.textContent = popupAbout.value;
  popupPersonal.classList.remove('popup_opened');
}

const submitAddCardHandler = (evt) => {
  evt.preventDefault();
  popupPlace.classList.remove('popup_opened');
  renderCard({ name: inputCardName.value }, { image: inputCardLink.value });
  inputCardName.value = '';
  inputCardLink.value = '';
};

// Слушатели
formAccount.addEventListener('submit', submitFormAccountHandler);
formCard.addEventListener('submit', submitAddCardHandler);
