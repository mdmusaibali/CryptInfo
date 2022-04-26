import icons from "url:../../../src/img/icons.svg";
import PreviewView from "./previewView";
import View from "./view";
class SearchResultsView extends PreviewView {
  _parentEl = document.querySelector(".search-results__list");

  _modifySearchResults(query) {
    const elements = Array.from(this._parentEl.children);
    elements.forEach((el) => {
      const name = el.firstElementChild.dataset.name.toLowerCase();
      !name.startsWith(query.toLowerCase().trim())
        ? el.firstElementChild.classList.add("hidden")
        : el.firstElementChild.classList.remove("hidden");
    });
  }
}

export default new SearchResultsView();
