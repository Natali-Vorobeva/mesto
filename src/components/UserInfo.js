export default class UserInfo {
  constructor( { username, about } ) {
    this._username = username;
    this._about = about;
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      about: this._about.textContent
    }
  };

  setUserInfo(username,  about) {
    this._username.textContent = username,
    this._about.textContent = about
  }
}

