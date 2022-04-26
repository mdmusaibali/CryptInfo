export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timer()]);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
export const formatMoney = function (amount) {
  const money = new Intl.NumberFormat(navigator.language).format(
    Math.abs(amount)
  );
  if (amount < 0) {
    return `-₹${money}`;
  } else if (!amount) {
    return "-";
  } else {
    return `₹${money}`;
  }
};

export const formatNumber = function (amount, country) {
  return new Intl.NumberFormat("country").format(amount);
};

export const returnColor = function (value) {
  if (value < 0) {
    return "color-red";
  } else {
    return "color-green";
  }
};

export const formatDate = function (date) {
  const newDate = new Date(date);

  return `${newDate.toLocaleString(navigator.language, {
    month: "long",
  })} ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

export const replaceNullWithZero = function (obj) {
  Object.keys(obj).forEach(function (key) {
    if (!obj[key] || obj[key] === "") obj[key] = 0;
  });
  return obj;
};

export const timer = async function () {
  return new Promise((res, rej) => {
    setTimeout(function () {
      rej(new Error("Connection timeout. Please try again later."));
    }, 10000);
  });
};
