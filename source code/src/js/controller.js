import * as model from "./model";
import bookmarksView from "./views/bookmarksView";
import cryptoInfoView from "./views/cryptoInfoView";
import mobileView from "./views/mobileView";
import searchResultsView from "./views/searchResultsView";
import searchView from "./views/searchView";

const controlSearchResults = async function () {
  try {
    model.getBrowserData();
    searchResultsView.renderSpinner();
    await model.getCryptos();
    searchResultsView.render(model.state.cryptos, "$", "en-UK");
  } catch (err) {
    console.error(err);
    searchResultsView.renderError(err);
  }
};

const controlSearch = function (query) {
  searchResultsView._modifySearchResults(query);
};

const controlCryptoInfo = async function (msg) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    searchResultsView.update(model.state.cryptos, "$", "en-UK");
    cryptoInfoView.renderSpinner();
    await model.getCryptoInfo(id);
    cryptoInfoView.render(model.state.displayedCrypto, "₹", "en-IN");
    bookmarksView.update(model.state.bookmarks, "₹", "en-IN");
  } catch (err) {
    console.log(err);
    cryptoInfoView.renderError(err);
  }
};

const controlAddBookmark = function () {
  if (!model.state.displayedCrypto.bookmarked) {
    model.addBookmark(model.state.displayedCrypto);
  } else {
    model.deleteBookmark(model.state.displayedCrypto.id);
  }
  bookmarksView.render(model.state.bookmarks, "₹", "en-IN");
  cryptoInfoView.update(model.state.displayedCrypto);
  model.state.bookmarks.length === 0
    ? bookmarksView.renderMessage(
        "Your bookmarked crypto currencies will appear here."
      )
    : "";
};

const controlBookmarks = function () {
  if (model.state.bookmarks.length === 0) {
    bookmarksView.renderMessage(
      "Your bookmarked crypto currencies will appear here."
    );
  } else {
    bookmarksView.renderSpinner();
    bookmarksView.render(model.state.bookmarks, "₹", "en-IN");
  }
};

const controlMobileAdjustments = function () {
  mobileView.adjustToMobile();
};

const init = function () {
  mobileView.addHandlerScreenWidth(controlMobileAdjustments);
  controlSearchResults();
  searchView._addHandlerSearch(controlSearch);
  cryptoInfoView._addHandlerLoad(controlCryptoInfo);
  cryptoInfoView._addHandlerBookmark(controlAddBookmark);
  bookmarksView._addHandlerLoad(controlBookmarks);
};
init();
