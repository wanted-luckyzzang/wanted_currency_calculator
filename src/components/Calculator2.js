import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  addCommaWithSeparator,
  addCommaToMoney,
  roundToTwo,
  priceToNumber,
} from '../utils/formatMoney';
import formatDate from '../utils/formatDate';
import Grid from '../common/Grid';

const Calculator2 = () => {
  const [select, setSelect] = useState('USD');
  const [dropdownItems, setDropdownItems] = useState([
    'CAD',
    'KRW',
    'HKD',
    'JPY',
    'CNY',
  ]);
  const [currency, setCurrency] = useState([]);
  const [date, setDate] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);
  const inputRef = useRef(null);

  const totalItems = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];

  const updateInputValue = () => {
    inputRef.current.value = addCommaToMoney(inputRef.current.value);
    setInputPrice(inputRef.current.value);
  };
  const updateSelect = (event) => {
    setSelect(event.target.innerText);
    setDropdownItems(totalItems.filter((e) => e !== event.target.innerText));
  };

  const getCurrencyRatio = (idx, currencyBase) => {
    return currencyBase
      .filter((e, idx2) => idx !== idx2)
      .map((e) => e / currencyBase[idx]);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://api.currencylayer.com/live?access_key=${
          process.env.REACT_APP_ACCESS_KEY
        }&currencies=${dropdownItems.join(',')}`,
      );
      const currencyBase = [1, ...Object.values(data.quotes)];
      const currencyList = {};
      totalItems.forEach((e, idx) => {
        currencyList[e] = getCurrencyRatio(idx, currencyBase);
      });
      setCurrency(currencyList);
      setDate(data.timestamp);
      console.log(currencyList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid width="500px" padding="30px 30px" radius="24px" isFlex column>
      <Grid
        isFlex
        justify="space-around"
        height="120px"
        radius="16px"
        padding="20px 0"
      >
        <Input
          type="text"
          onChange={updateInputValue}
          placeholder="0"
          ref={inputRef}
        />
        <Dropdown>
          {select}
          <DropdownList>
            {dropdownItems.map((item, idx) => {
              return (
                <button key={idx} onClick={updateSelect}>
                  {item}
                </button>
              );
            })}
          </DropdownList>
        </Dropdown>
      </Grid>
      <Grid height="400px" radius="16px" isFlex column>
        <Tab>
          {dropdownItems.map((item, idx) => {
            return (
              <button key={idx} onClick={() => setTabIndex(idx)}>
                {item}
              </button>
            );
          })}
        </Tab>
        <Grid isFlex column justify="center" align="center" bg="transparent">
          <Money>
            {inputPrice !== 0
              ? addCommaWithSeparator(
                  roundToTwo(
                    priceToNumber(inputPrice) * currency[select][tabIndex],
                  ),
                )
              : 0}
          </Money>
          <Date>{formatDate(date * 1000)}</Date>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Input = styled.input`
  padding: 4px 12px;
  font-size: 20px;
  border-radius: 16px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const DropdownList = styled.ul`
  list-style: none;
  position: absolute;
  top: 80px;
  left: 0;
  width: 50px;
`;

const Dropdown = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  position: relative;

  & ul {
    list-style: none;
    display: none;
  }

  &:hover {
    ${DropdownList} {
      display: block;
    }
  }
`;

const Content = styled.div`
  background: lightyellow;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tab = styled.ul`
  height: 80px;
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;

  & li {
    border: 1px solid #8e8e8e;
    text-align: center;
    width: 80px;
    padding: 16px 0;
  }
`;

const Result = styled.div`
  height: 400px;
  padding: 40px;
`;

const Money = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const Date = styled.p`
  font-size: 18px;
`;

export default Calculator2;
