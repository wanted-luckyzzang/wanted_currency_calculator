import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import {
  addCommaWithSeparator,
  roundToTwo,
  priceToNumber,
  updateInputValue,
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
  const [inputValue, setInputValue] = useState(0);
  const inputRef = useRef(null);
  const tabRef = useRef(null);

  const totalItems = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];

  const updateSelect = (event) => {
    setSelect(event.target.innerText);
    setDropdownItems(totalItems.filter((e) => e !== event.target.innerText));
  };

  const getCurrencyRatio = (idx, currencyBase) => {
    return currencyBase
      .filter((e, index) => idx !== index)
      .map((e) => e / currencyBase[idx]);
  };

  const getApi = async () => {
    try {
      if (!JSON.parse(localStorage.getItem('currency2'))) {
        const { data } = await axios.get(
          `http://api.currencylayer.com/live?access_key=dd061ec34800c51169bb23adb343f890&currencies=${dropdownItems.join(
            ',',
          )}`,
        );
        const currencyBase = [1, ...Object.values(data.quotes)];
        const currencyList = {};
        totalItems.forEach((e, idx) => {
          currencyList[e] = getCurrencyRatio(idx, currencyBase);
        });
        setCurrency(currencyList);
        setDate(data.timestamp);
        localStorage.setItem('currency2', JSON.stringify(currencyList));
      } else {
        setCurrency(JSON.parse(localStorage.getItem('currency2')));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApi();
    tabRef.current.firstChild.focus();
  }, []);

  return (
    <Grid width="500px" padding="30px 30px" radius="24px" isFlex column>
      <Grid
        isFlex
        justify="space-around"
        height="120px"
        radius="16px"
        padding="20px 0"
        margin="0 0 20px"
      >
        <Input
          type="text"
          onChange={() => updateInputValue(inputRef, setInputValue)}
          placeholder="0"
          ref={inputRef}
        />
        <Dropdown>
          {select}
          <DropdownList>
            {dropdownItems.map((item, idx) => {
              return (
                <ListItem key={idx} onClick={updateSelect}>
                  {item}
                </ListItem>
              );
            })}
          </DropdownList>
        </Dropdown>
      </Grid>
      <Grid height="400px" radius="16px" isFlex column align="center">
        <Tab ref={tabRef}>
          {dropdownItems.map((item, idx) => {
            return (
              <TabItem key={idx} onClick={() => setTabIndex(idx)}>
                {item}
              </TabItem>
            );
          })}
        </Tab>
        <Grid
          width="80%"
          height="240px"
          isFlex
          column
          justify="center"
          align="center"
          bg="transparent"
          radius="16px"
        >
          <Money>
            {inputValue !== 0
              ? addCommaWithSeparator(
                  roundToTwo(
                    priceToNumber(inputValue) * currency[select][tabIndex],
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
  border-radius: 16px;
`;

const Dropdown = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  background: #fff;
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

const ListItem = styled.button`
  width: 150px;
  height: 30px;
  background: rgba(255, 255, 255, 0.9);
  &:hover {
    background-image: linear-gradient(
      to top,
      #f3e7e9 0%,
      #e3eeff 99%,
      #e3eeff 100%
    );
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  }
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

const TabItem = styled.button`
  width: 80px;
  border-radius: 8px;
  &:focus {
    /* border-bottom: 4px solid #8e8e8e; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    /* background:  */
  }
`;

const Money = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const Date = styled.p`
  font-size: 18px;
`;

export default Calculator2;
