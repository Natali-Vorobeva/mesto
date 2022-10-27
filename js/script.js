let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.main__open');
let close = document.querySelector('.popup__close');
let username = document.querySelector('.main__username');
let about = document.querySelector('.main__about');
let popupUsername = document.querySelector('.popup__name');
let popupAbout = document.querySelector('.popup__about');


function showPopup() {
popup.classList.add('popup_opened');
}
openPopup.addEventListener('click', showPopup);

if (username !== '') {
  popupUsername.setAttribute('value', username.textContent);
  popupAbout.setAttribute('value', about.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}
close.addEventListener('click', closePopup);
let formElement = document.querySelector('.popup__content');
let nameValue = popupUsername.getAttribute('value', username.textContent);
let aboutValue = popupAbout.getAttribute('value', about.textContent);
let saveButton = document.querySelector('.popup__save');

function formSubmitHandler (evt) {
  evt.preventDefault();
  username.textContent = popupUsername.value;
  about.textContent = popupAbout.value;
}
saveButton.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);
