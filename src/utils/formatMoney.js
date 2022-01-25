const comma = (str) => String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

const uncomma = (str) => String(str).replace(/[^\d]+/g, '');

const addCommaToMoney = (money) => comma(uncomma(money));

const addCommaWithSeparator = (money) =>
  money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const roundToTwo = (num) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return ((Math.round(m) / 100) * Math.sign(num)).toFixed(2);
};

const priceToNumber = (price) => {
  return Number(price.split(',').join(''));
};
export { addCommaWithSeparator, addCommaToMoney, roundToTwo, priceToNumber };
