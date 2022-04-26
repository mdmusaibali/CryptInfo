import icons from "url:../../../src/img/icons.svg";
import { formatMoney } from "../helper";
import PreviewView from "./previewView";
import View from "./view";
class BookmarksView extends PreviewView {
  _parentEl = document.querySelector(".bookmarks__list");

  _addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }

  //   _generateMarkup() {
  //     return this._data.map(this._generateMarkupHelper.bind(this)).join("");
  //   }

  //   _generateMarkupHelper(crypto) {
  //     const id = window.location.hash.slice(1);
  //     return `
  //     <li class="preview">
  //     <a class="preview-link ${
  //       crypto.id === id ? "preview-link--active" : ""
  //     }" href="#${crypto.id}" data-name="${crypto.name}" class="preview">
  //       <img class="preview-image" src="${crypto.image}" />
  //       <div class="preview-details">
  //         <h1 class="preview-symbol">${crypto.symbol}</h1>
  //         <h2 class="preview-name">${crypto.name}</h2>
  //       </div>
  //       <p class="preview-price">${formatMoney(crypto.currentPrice)}</p>
  //     </a>
  //   </li>
  //     `;
  //   }
}

export default new BookmarksView();
