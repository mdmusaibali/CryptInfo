import { formatDate, formatMoney, formatNumber, returnColor } from "../helper";
import View from "./view";
import icons from "url:../../../src/img/icons.svg";

class cryptoInfoView extends View {
  _parentEl = document.querySelector(".crypto-info");

  _addHandlerLoad(handler) {
    ["hashchange", "load"].forEach((el) =>
      window.addEventListener(el, handler)
    );
  }

  _addHandlerBookmark(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const target = e.target.closest(".icon-bookmark");
      if (!target) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <div class="crypto-info__rank">Rank #${this._data.marketCapRank}</div>
    <div class="crypto-info__details">
    <img
      src="${this._data.image}"
      alt=""
    />
    <h1 class="crypto-info__name">
      ${
        this._data.name
      } (<span class="crypto-info__symbol">${this._data.symbol.toUpperCase()}</span>)
    </h1>
  </div>

  <div class="crypto-info__price">
    <div>
    ${formatMoney(this._data.currentPrice)}
    <span class="crypto-info__priceChangePercentage24h ${returnColor(
      this._data.priceChangePercentage24h
    )}">${this._data.priceChangePercentage24h.toFixed(2)}%</span>
    </div>
    <button class="crypto-info__bookmark--button">
      <svg class="icon icon-bookmark">
        <use href="${icons}#icon-tag${
      this._data.bookmarked ? "-fill" : "-stroke"
    }"></use>
      </svg>
    </button>
  </div>

  <div class="crypto-info__AT--statistics">
            <div class="crypto-info__ATH--statistics">
              <h2 class="heading-secondary color-green">
                All Time High (ATH) Statistics
              </h2>
              <ul class="crypto-info__AT--items">
                <li class="crypto-info__AT--item">
                  All time high: <span>${formatMoney(
                    this._data.allTimeHigh
                  )}</span>
                </li>
                <li class="crypto-info__AT--item">
                  % change for ATH:
                  <span class="${returnColor(
                    this._data.allTimeHighChangePercentage
                  )}">${this._data.allTimeHighChangePercentage.toFixed(
      2
    )}%</span>
                </li>
                <li class="crypto-info__AT--item">
                  Date for ATH: <span>${formatDate(
                    this._data.allTimeHighDate
                  )}</span>
                </li>
              </ul>
            </div>
            <div class="crypto-info__ATL--statistics">
              <h2 class="heading-secondary color-red">
                All Time Low (ATL) Statistics
              </h2>
              <ul class="crypto-info__AT--items">
                <li class="crypto-info__AT--item">
                  All time low: <span>${formatMoney(
                    this._data.allTimeLow
                  )}</span>
                </li>
                <li class="crypto-info__AT--item">
                  % change for ATL:
                  <span class="${returnColor(
                    this._data.allTimeLowChangePercentage
                  )}">${this._data.allTimeLowChangePercentage.toFixed(
      2
    )}%</span>
                </li>
                <li class="crypto-info__AT--item">
                  Date for ATL: <span>${formatDate(
                    this._data.allTimeLowDate
                  )}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="crypto-info__price--statistics">
            <h2 class="heading-secondary marb-small">Price Statistics</h2>
            <table>
              <tr>
                <td>Highest in 24h:</td>
                <td>${formatMoney(this._data.high24h)}</td>
              </tr>
              <tr>
                <td>Lowest in 24h:</td>
                <td>${formatMoney(this._data.low24h)}</td>
              </tr>
              <tr>
                <td>Price change in 24h:</td>
                <td class="${returnColor(
                  this._data.priceChange24h
                )}">${formatMoney(this._data.priceChange24h)}</td>
              </tr>
              <tr>
                <td>% change for price in 1h:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage1h
                )}">${this._data.priceChangePercentage1h.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 24h:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage24h
                )}">${this._data.priceChangePercentage24h.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 7d:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage7d
                )}">${this._data.priceChangePercentage7d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 14d:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage14d
                )}">${this._data.priceChangePercentage14d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 30d:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage30d
                )}">${this._data.priceChangePercentage30d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 60d:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage60d
                )}">${this._data.priceChangePercentage60d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 200d:</td>
                <td class="${returnColor(
                  this._data.priceChangePercentage200d
                )}">${this._data.priceChangePercentage200d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>% change for price in 1y:</td>
                <td class="${
                  this._data.priceChangePercentage1y === 0
                    ? returnColor(-1)
                    : returnColor(this._data.priceChangePercentage1y)
                }">${
      this._data.priceChangePercentage1y === 0
        ? "data unavailable"
        : this._data.priceChangePercentage1y + "%"
    }</td>
              </tr>
            </table>
          </div>
          <h2 class="heading-secondary marb-small">
            Market Capitalization and Supply Statistics
          </h2>
          <table>
            <tr>
              <td>Marketcap rank:</td>
              <td>#${this._data.marketCapRank}</td>
            </tr>
            <tr>
              <td>Marketcap change in 24h:</td>
              <td class="${returnColor(
                this._data.marketCapChange24h
              )}">${formatMoney(this._data.marketCapChange24h)}</td>
            </tr>
            <tr>
              <td>% change for marketcap in 24h:</td>
              <td class="${returnColor(
                this._data.marketCapChangePercentage24h
              )}">${this._data.marketCapChangePercentage24h.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Total supply:</td>
              <td>${formatNumber(this._data.totalSupply)}</td>
            </tr>
            <tr>
              <td>Max supply:</td>
              <td>${formatNumber(this._data.maxSupply)}</td>
            </tr>
          </table>


          <h2 class="heading-secondary marb-small">Description</h2>
          <div class="crypto-info__description">
            ${
              this._data.description
                ? this._data.description
                : "Sorry, description unavailable."
            }
          </div>
          <h2 class="heading-secondary marb-small">Social Links</h2>
          <div class="crypto-info__social-links">
            <ul class="crypto-info__link--items">
              <li class="crypto-info__link--item">
                Homepage:
                <a href="${this._data.homepage ? this._data.homepage : ""}">${
      this._data.homepage ? this._data.homepage : "unavailable"
    }</a>
              </li>
              <li class="crypto-info__link--item">
                Official Forum:
                <a href="${
                  this._data.officialForum ? this._data.officialForum : ""
                }">${
      this._data.officialForum ? this._data.officialForum : "unavailable"
    }</a>
              </li>
              <li class="crypto-info__link--item">
                Subreddit:
                <a href="${this._data.subreddit ? this._data.subreddit : ""}"
                  >${
                    this._data.subreddit ? this._data.subreddit : "unavailable"
                  }</a
                >
              </li>
              <li class="crypto-info__link--item">
                GitHub Repository:
                <a href="${this._data.gitHubRepo ? this._data.gitHubRepo : ""}"
                  >${
                    this._data.gitHubRepo
                      ? this._data.gitHubRepo
                      : "unavailable"
                  }</a
                >
              </li>
            </ul>
          </div>
          <p class="crypto-info__last-update">Last Updated on ${formatDate(
            this._data.lastUpdate
          )}.</p>
    `;
  }
}

export default new cryptoInfoView();
