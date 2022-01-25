import React, { useState } from 'react';
import styled from 'styled-components';
import { formatMoney } from '../utils/formatMoney';
import formatDate from '../utils/formatDate';

const Calculator2 = () => {
  const [isActive, setIsActive] = useState(false);
  // const [item, setItem] = useState(null);

  // const onActiveToggle = useCallback(() => {
  //   setIsActive((prev) => !prev);
  // }, []);

  // const onSelectItem = useCallback((e) => {
  //   const targetId = e.target.id;

  //   if (targetId === 'item_name') {
  //     setItem(e.target.parentElement.innertText);
  //   } else if (targetId === 'item') {
  //     setItem(e.target.innertText);
  //   }

  //   setIsActive((prev) => !prev);
  // }, []);

  // const dropdownItems = ['CAD', 'KRW', 'HKD', 'JPY', 'CNY'];

  return (
    <Container>
      <Header>
        <Input type="number" />
        <Dropdown>
          {/* <option value="CAD">CAD</option>
          <option value="KRW">KRW</option>
          <option value="HKD">HKD</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="USD">USD</option> */}
          CAD
          <DropdownList>
            <li>KRW</li>
            <li>HKD</li>
            <li>JPY</li>
            <li>CNY</li>
            <li>USD</li>
          </DropdownList>
        </Dropdown>
      </Header>
      <Content>
        <Tab
          onClick={() => {
            setIsActive(!isActive);
            console.log(isActive);
          }}
        >
          <li>CAD</li>
          <li>KRW</li>
          <li>HKD</li>
          <li>JPY</li>
          <li>CNY</li>
          <li>USD</li>
        </Tab>
        <Result>
          <Money>{formatMoney('1000000')}</Money>
          <Date>{formatDate()}</Date>
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
