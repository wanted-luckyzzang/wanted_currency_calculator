import './reset.css';
import styled from 'styled-components';
import Calculator1 from './components/Calculator1';
import Calculator2 from './components/Calculator2';

function App() {
  return (
    <Wrapper>
      <Calculator1 />
      <Calculator2 />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: url('img/background.jpg') no-repeat;
  background-size: cover;
`;

export default App;
