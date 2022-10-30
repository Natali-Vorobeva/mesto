const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.personal-page__open');
const close = document.querySelector('.popup__close');
const username = document.querySelector('.personal-page__username');
const about = document.querySelector('.personal-page__about');
const popupUserName = document.querySelector('.popup__input_data_name');
const popupAbout = document.querySelector('.popup__input_data_about');
const formElement = document.querySelector('.popup__content');

// Функция открытия попап
function showPopup() {
  popup.classList.add('popup_opened');
  popupUserName.setAttribute('value', username.textContent);
  popupAbout.setAttribute('value', about.textContent);
}

// Функция закрытия попап
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Функция сохранения
function submitFormHandler (evt) {
  evt.preventDefault();
  username.textContent = popupUserName.value;
  about.textContent = popupAbout.value;
  closePopup();
}

//Слушатели
openPopup.addEventListener('click', showPopup);
close.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitFormHandler);
