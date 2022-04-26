class MobileView {
  _menuIcon = document.querySelector(".menu-icon");
  _aside = document.querySelector(".aside");
  _searchBox = document.querySelector(".header__search--field");
  addHandlerScreenWidth(handler) {
    if (screen.width < 426) {
      console.log("Mobile adjustments initiated...");
      handler();
      console.log("Mobile adjustments successfully completed...");
    }
  }

  adjustToMobile() {
    this._menuIcon.classList.remove("hidden");
    this._aside.classList.add("transform");
    this._menuIcon.addEventListener("click", () => {
      this._asideToggle();
    });
    this._aside.addEventListener("click", () => {
      this._asideToggle();
      this._searchBox.value = "";
    });
  }

  _asideToggle(permanentOn = false) {
    if (permanentOn) {
      this._aside.classList.remove("transform");
    } else {
      this._aside.classList.toggle("transform");
    }
  }
}
export default new MobileView();
