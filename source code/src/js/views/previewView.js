import View from "./view";
import { formatMoney, formatNumber } from "../helper";

export default class PreviewView extends View {
  _generateMarkup(symbol, country) {
    // console.log(symbol);
    return this._data
      .map((el) => {
        return this._generateMarkupHelper(el, symbol, country);
      })
      .join("");
  }

  _generateMarkupHelper(crypto, symbol, country) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
        <a class="preview-link ${
          crypto.id === id ? "preview-link--active" : ""
        }" href="#${crypto.id}" data-name="${crypto.name}" class="preview">
          <img class="preview-image" src="${crypto.image}" />
          <div class="preview-details">
            <h1 class="preview-symbol">${crypto.symbol}</h1>
            <h2 class="preview-name">${crypto.name}</h2>
          </div>
          <p class="preview-price">${symbol}${formatNumber(
      crypto.currentPrice,
      country
    )}</p>
        </a>
      </li>
        `;
  }
}
