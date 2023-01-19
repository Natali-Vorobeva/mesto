const popupUserName = document.querySelector('.popup__input_data_name');
const popupAbout = document.querySelector('.popup__input_data_about');
export default class UserInfo {
  constructor( { username, about } ) {
    this._username = username;
    this._about = about;
    this._popupUserName = popupUserName;
    this._popupAbout = popupAbout;
  }

  setUserInfo() {
    this._popupUserName.setAttribute('value', this._username.textContent);
    this._popupAbout.setAttribute('value', this._about.textContent);
  }

  getUserInfo() {
    this._username.textContent = this._popupUserName.value;
    this._about.textContent = this._popupAbout.value;
  }
}

