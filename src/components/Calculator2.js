import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { formatMoney } from '../utils/formatMoney';
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
  const [isActive, setIsActive] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [date, setDate] = useState();
  const [index, setIndex] = useState(0);

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

      console.log(data);
      console.log(data.timestamp);
      console.log(Object.values(data.quotes));

      setCurrency(Object.values(data.quotes));
      setDate(data.timestamp);

      console.log(currency);
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
        <Input type="number" />
        <Dropdown>
          {select}
          <DropdownList>
            {dropdownItems.map((item) => {
              return <button onClick={updateSelect}>{item}</button>;
            })}
          </DropdownList>
        </Dropdown>
      </Header>
      <Content>
        <Tab
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {dropdownItems.map((item, idx) => {
            return <button onClick={() => setIndex(idx)}>{item}</button>;
          })}
        </Tab>
        <Result>
          <Money>{currency[index]}</Money>
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

    ${DropdownList} li:hover {
      background: lightgreen;
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
