import icons from "url:../../../src/img/icons.svg";

export default class View {
  _data;

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    this._clear();
    const markup = `
        <svg class="spinner">
                  <use href="${icons}#icon-spinner4"></use>
                </svg>
        `;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  render(data, symbol, country) {
    this._data = data;
    const markup = this._generateMarkup(symbol, country);
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  update(data, symbol, country) {
    this._data = data;
    const newMarkup = this._generateMarkup(symbol, country);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Updates changed texts
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(msg) {
    this._clear();
    const markup = `
    <div class="message">
    <svg class="message-icon icon icon-warning">
      <use href="${icons}#icon-warning"></use>
      <p class="message-msg">${msg}</p>
    </svg>
  </div>
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(msg) {
    this._clear();
    const markup = `
    <div class="message">
    <svg class="message-icon icon icon-smile">
      <use href="${icons}#icon-smile"></use>
      <p class="message-msg">
        ${msg}
      </p>
    </svg>
  </div>
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
