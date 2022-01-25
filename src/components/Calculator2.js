import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { formatMoney, roundToTwo } from '../utils/formatMoney';
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
  const [index, setIndex] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);

  const handleInput = (event) => {
    setInputPrice(event.target.value);
  };
  const totalItems = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
  const updateSelect = (event) => {
    setSelect(event.target.innerText);
    setDropdownItems(totalItems.filter((e) => e !== event.target.innerText));
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://api.currencylayer.com/live?access_key=dd061ec34800c51169bb23adb343f890&source=${select}&currencies=${dropdownItems.join(
          ',',
        )}`,
      );
      setCurrency(Object.values(data.quotes));
      setDate(data.timestamp);
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
        <Input type="number" onChange={handleInput} placeholder="0" />
        <Dropdown>
          {select}
          <DropdownList>
            {dropdownItems.map((item) => {
              return <button onClick={updateSelect}>{item}</button>;
            })}
          </DropdownList>
        </Dropdown>
      </Grid>
      <Grid height="400px" radius="16px" isFlex column>
        <Tab>
          {dropdownItems.map((item, idx) => {
            return <button onClick={() => setIndex(idx)}>{item}</button>;
          })}
        </Tab>
        <Grid isFlex column justify="center" align="center" bg="transparent">
          <Money>{formatMoney(roundToTwo(inputPrice * currency[index]))}</Money>
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
