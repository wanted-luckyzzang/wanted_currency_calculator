import React from 'react';
import './reset.css';
import styled from 'styled-components';
import Calculator2 from './components/Calculator2';

function App() {
  return (
    <Wrapper>
      <Calculator2 />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('img/background.jpg') no-repeat;
  background-size: cover;
`;

export default App;
