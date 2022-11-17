const popup = document.querySelector('.popup');

const openPopupPersonal = document.querySelector('.personal-page__open');
const formAccount = document.forms['account'];
const profilePopup = document.querySelector('#personal-save');
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

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//  Закрытие попапов
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((buttonClose) => {
  const popup = buttonClose.closest('.popup');
  buttonClose.addEventListener('click', () => closePopup(popup));
});

//  Удаление карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.gallery__card-body').remove();
}

// Добавление лайка
const handleLikedCard = (evt) => {
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
  imageCard.setAttribute('alt', `Вид на  ${dataCard.name}`);

  imageCard.addEventListener('click', function () {
    const imagePopup = document.querySelector('.popup_card_image');
    const popup = imagePopup .closest('.popup');
    const popupShowImage = document.querySelector('.popup__show-image');
    popupShowImage.setAttribute('src', dataCard.link);
    popupShowImage.setAttribute('alt', `Вид на  ${dataCard.name}`);
    const showdescription = document.querySelector('.popup__description-name');
    showdescription.textContent = dataCard.name;
    openPopup(popup);
  });

  const deleteBtn = newCard.querySelector('.gallery__delete');
  deleteBtn.addEventListener('click', handleDeleteCard);

  const favouritesButton = newCard.querySelector('.gallery__button-favourites');
  favouritesButton.addEventListener('click', handleLikedCard);
  return newCard;
};

// Добавление карточки
const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
}

initialCards.forEach(renderCard);

// Функции отправки форм
function handleSubmitFormAccount(evt) {
  evt.preventDefault();
  username.textContent = popupUserName.value;
  about.textContent = popupAbout.value;
  closePopup(popup);
}

const handleSubmitAddCard = (evt) => {
  evt.preventDefault();
  cardPopup.classList.remove('popup_opened');
  renderCard({ link: inputCardLink.value, name: inputCardName.value });
  evt.target.reset();
};

// Слушатели
formAccount.addEventListener('submit', handleSubmitFormAccount);
formCard.addEventListener('submit', handleSubmitAddCard);

openPopupPersonal.addEventListener('click', function () {
  const popup = profilePopup.closest('.popup');
  popupUserName.setAttribute('value', username.textContent);
  popupAbout.setAttribute('value', about.textContent);
  openPopup(popup);
});

openPopupPlace.addEventListener('click', function () {
  const popup = cardPopup.closest('.popup');
  openPopup(popup);
});
