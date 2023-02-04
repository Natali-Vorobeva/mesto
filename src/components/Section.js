export default class Section {
  constructor({renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
  });
  }

  addInitialCards(item) {
    this._container.append(item);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
