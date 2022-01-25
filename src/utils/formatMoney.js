const formatMoney = (money) =>
  money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const formatInput = (obj) => {
  obj.value = formatMoney(obj.value);
};

const roundToTwo = (num) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};

export { formatMoney, roundToTwo };
