import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Grid from '../common/Grid';
import {
  addCommaWithSeparator,
  roundToTwo,
  addCommaToMoney,
  priceToNumber,
} from '../utils/formatMoney';

const Calculator1 = () => {
  const [currency, setCurrency] = useState('');
  const [receiptCountry, setReceiptCountry] = useState('KRW');
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);
  const updateInputValue = () => {
    inputRef.current.value = addCommaToMoney(inputRef.current.value);
    setInputValue(inputRef.current.value);
  };

  const receiveable = addCommaWithSeparator(
    roundToTwo(
      priceToNumber(inputValue) *
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
          setCurrency(addCommaWithSeparator(roundToTwo(getData[index])));
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
          setCurrency(addCommaWithSeparator(roundToTwo(getData[value])));
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
    <Grid
      onSubmit={handleButton}
      height="560px"
      checkComponent="one"
      width="300px"
      padding="30px 30px"
      radius="24px"
    >
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
          <Input type="text" onChange={updateInputValue} ref={inputRef} />
          <span> USD</span>
        </div>
        <Button>submit</Button>
        {active &&
          (!inputValue || Number(receiveable) <= 0 || inputValue >= 10000 ? (
            <div>
              <span style={{ color: 'red' }}>송금액이 바르지 않습니다</span>
            </div>
          ) : (
            <div>{`수취금액은 ${receiveable} ${receiptCountry} 입니다.`}</div>
          ))}
      </div>
    </Grid>
  );
};

const Input = styled.input`
  background-color: #ffffff;
  :focus {
    border: 1px solid black;
  }
`;

const Button = styled.button`
  width: 150px;
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: #ffffff;
  :hover {
    opacity: 0.7;
  }
  border-radius: 5px;
`;

export default Calculator1;
