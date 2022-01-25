import './reset.css';
import styled from 'styled-components';
import CalculatorOne from './components/CalculatorOne';
import Calculator2 from './components/Calculator2';

function App() {
  return (
    <Wrapper>
      <CalculatorOne />
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
