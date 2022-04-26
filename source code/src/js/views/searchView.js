import mobileView from "./mobileView";
import View from "./view";

class searchView extends View {
  _parentEl = document.querySelector(".header__search");
  _addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._parentEl.firstElementChild.addEventListener("keyup", function () {
      const query = this.value;
      handler(query);
      mobileView._asideToggle(true);
    });
  }
}

export default new searchView();
