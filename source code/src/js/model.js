import { getJSON, replaceNullWithZero } from "./helper";

export const state = {
  cryptos: [],
  displayedCrypto: {},
  bookmarks: [],
};

export const getCryptos = async function () {
  const data = await getJSON(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
  );
  const newObj = data.map((el) => {
    return {
      id: el.id,
      symbol: el.symbol,
      image: el.image,
      name: el.name,
      currentPrice: el.current_price,
    };
  });

  state.cryptos.push(...newObj);
};

export const getCryptoInfo = async function (id) {
  const data = await getJSON(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false&sparkline=false`
  );
  const obj = {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    hashingAlgorithm: data.hashing_algorithm,
    description: data.description.en,
    homepage: data.links.homepage[0],
    officialForum: data.links.official_forum_url[0],
    subreddit: data.links.subreddit_url,
    gitHubRepo: data.links.repos_url.github[0],
    image: data.image.large,
    marketCapRank: data.market_cap_rank,
    currentPrice: data.market_data.current_price.inr,
    allTimeHigh: data.market_data.ath.inr,
    allTimeHighChangePercentage: data.market_data.ath_change_percentage.inr,
    allTimeHighDate: data.market_data.ath_date.inr,
    allTimeLow: data.market_data.atl.inr,
    allTimeLowChangePercentage: data.market_data.atl_change_percentage.inr,
    allTimeLowDate: data.market_data.atl_date.inr,
    totalVolume: data.market_data.total_volume.inr,
    high24h: data.market_data.high_24h.inr,
    low24h: data.market_data.low_24h.inr,
    priceChange24h: data.market_data.price_change_24h_in_currency.inr,
    priceChangePercentage1h:
      data.market_data.price_change_percentage_1h_in_currency.inr,
    priceChangePercentage24h:
      data.market_data.price_change_percentage_24h_in_currency.inr,
    priceChangePercentage7d:
      data.market_data.price_change_percentage_7d_in_currency.inr,
    priceChangePercentage14d:
      data.market_data.price_change_percentage_14d_in_currency.inr,
    priceChangePercentage30d:
      data.market_data.price_change_percentage_30d_in_currency.inr,
    priceChangePercentage60d:
      data.market_data.price_change_percentage_60d_in_currency.inr,
    priceChangePercentage200d:
      data.market_data.price_change_percentage_200d_in_currency.inr,
    priceChangePercentage1y:
      data.market_data.price_change_percentage_1y_in_currency.inr,
    marketCapChange24h: data.market_data.market_cap_change_24h_in_currency.inr,
    marketCapChangePercentage24h:
      data.market_data.market_cap_change_percentage_24h_in_currency.inr,
    totalSupply: data.market_data.total_supply,
    maxSupply: data.market_data.max_supply,
    lastUpdate: data.market_data.last_updated,
  };
  const newObj = replaceNullWithZero(obj);
  state.displayedCrypto = { ...newObj };
  if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
    state.displayedCrypto.bookmarked = true;
  } else {
    state.displayedCrypto.bookmarked = false;
  }
};

export const addBookmark = function (crypto) {
  state.bookmarks.push(crypto);

  state.displayedCrypto.bookmarked = true;

  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  state.displayedCrypto.bookmarked = false;
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const getBrowserData = function () {
  const localData = JSON.parse(localStorage.getItem("bookmarks"));
  if (localData) state.bookmarks = localData;
};

export const greet = function () {
  console.log("Hello there");
};
