export default class UserInfo {
  constructor( { userName, about } ) {
    this._username = userName;
    this._about = about;
  }

  getUserInfo() {
    return {
      userName: this._username.textContent,
      about: this._about.textContent
    }
  };

  setUserInfo(userName,  about) {
    this._username.textContent = userName,
    this._about.textContent = about
  }
}

