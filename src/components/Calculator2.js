import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { formatMoney, roundToTwo } from '../utils/formatMoney';
import formatDate from '../utils/formatDate';

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
  const [tapIndex, setTapIndex] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);

  const handleInput = (event) => {
    setInputPrice(event.target.value);
  };
  const totalItems = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header>
        <Input type="number" onChange={handleInput} placeholder="0" />
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
      </Header>
      <Content>
        <Tab>
          {dropdownItems.map((item, idx) => {
            return (
              <button key={idx} onClick={() => setTapIndex(idx)}>
                {item}
              </button>
            );
          })}
        </Tab>
        <Result>
          <Money>
            {inputPrice !== 0
              ? formatMoney(roundToTwo(inputPrice * currency[select][tapIndex]))
              : 0}
          </Money>
          <Date>{formatDate(date * 1000)}</Date>
        </Result>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  height: auto;
  padding: 30px 10px;
  background: lightcyan;
`;

const Header = styled.div`
  background: lightpink;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 4px 12px;
  font-size: 20px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const DropdownList = styled.ul`
  list-style: none;
`;

const Dropdown = styled.div`
  width: 100px;
  list-style: none;

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
  background: lightblue;
  display: flex;
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
