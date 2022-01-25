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

const updateInputValue = (refEl, setState) => {
  refEl.current.value = addCommaToMoney(refEl.current.value);
  setState(refEl.current.value);
};

const limitInputValue = (refEl, setState) => {
  const priceNumber = priceToNumber(refEl.current.value);
  if (priceNumber > 1000) {
    refEl.current.value = addCommaToMoney('1000');
    setState(refEl.current.value);
  } else {
    refEl.current.value = addCommaToMoney(refEl.current.value);
    setState(refEl.current.value);
  }
};
export {
  addCommaWithSeparator,
  roundToTwo,
  priceToNumber,
  updateInputValue,
  limitInputValue,
};
