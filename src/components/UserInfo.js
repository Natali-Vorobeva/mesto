import { popupUserName, popupAbout } from '../utils/constants.js'
export default class UserInfo {
  constructor( { username, about } ) {
    this._username = username;
    this._about = about;
    this._popupUserName = popupUserName;
    this._popupAbout = popupAbout;
  }

  getUserInfo() {
    this._popupUserName.setAttribute('value', this._username.textContent);
    this._popupAbout.setAttribute('value', this._about.textContent);
    return;
  }

  setUserInfo() {
    this._username.textContent = this._popupUserName.value;
    this._about.textContent = this._popupAbout.value;
  }
}

