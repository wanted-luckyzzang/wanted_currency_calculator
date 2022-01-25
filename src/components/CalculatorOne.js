import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '../common/Grid';
import { formatMoney, roundToTwo } from '../utils/formatMoney';

const CalculatorOne = () => {
  const [currency, setCurrency] = useState('');
  const [receiptCountry, setReceiptCountry] = useState('KRW');
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const receiveable = formatMoney(
    roundToTwo(
      Number(inputValue) *
        Number(currency.includes(',') ? currency.replace(',', '') : currency),
    ),
  );

  useEffect(async () => {
    try {
      const data = localStorage.getItem('currency');
      const currencyData = JSON.parse(data) || [];
      if (!localStorage.getItem('currency')) {
        const getData = await axios.get(
          `http://api.currencylayer.com/live?access_key=${process.env.REACT_APP_ACCESS_KEY}`,
        );
        currencyData.push(getData.data.quotes);
        localStorage.setItem('currency', JSON.stringify(currencyData));
      }
      const getData = JSON.parse(localStorage.getItem('currency'))[0];
      for (const index in getData) {
        if (index.slice(3) === 'KRW') {
          setCurrency(formatMoney(roundToTwo(getData[index])));
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const handleSelect = async (event) => {
    setReceiptCountry(event.target.value);
    try {
      const getData = JSON.parse(localStorage.getItem('currency'))[0];
      console.log(getData);
      for (const value in getData) {
        if (value.slice(3) === event.target.value) {
          setCurrency(formatMoney(roundToTwo(getData[value])));
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleButton = (event) => {
    event.preventDefault();
    setInputValue(event.target[1].value);
    setActive(true);
  };

  return (
    <Grid onSubmit={handleButton}>
      <div>
        <h2>환율계산</h2>
        송금국가: 미국(USD)
        <div>
          수취국가:
          <select style={{ marginLeft: '5px' }} onChange={handleSelect}>
            <option value="KRW">한국(KRW)</option>
            <option value="JPY">일본(JPY)</option>
            <option value="PHP">필리핀(PHP)</option>
          </select>
        </div>
        <div>
          <span>환율: {currency}</span>
          <span> {receiptCountry}/USD</span>
        </div>
        <div>
          <span>송금액: </span>
          <input type="text" />
          <span> USD</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            style={{ width: '150px', marginBottom: '20px', marginTop: '10px' }}
          >
            submit
          </button>
        </div>
        {active &&
          (!inputValue || Number(receiveable) <= 0 || inputValue >= 10000 ? (
            <span style={{ color: 'red' }}>송금액이 바르지 않습니다</span>
          ) : (
            <div>{`수취금액은 ${receiveable} ${receiptCountry} 입니다.`}</div>
          ))}
      </div>
    </Grid>
  );
};

export default CalculatorOne;
