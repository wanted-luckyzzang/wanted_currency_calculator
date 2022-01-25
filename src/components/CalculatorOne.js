import React, { useState, useEffect } from "react";

import Grid from "../common/Grid";

const CalculatorOne = () => {
  const [currency, setCurrency] = useState('900.056691')
  const [receiptCountry, setReceiptCountry] = useState('KRW')
  const [active , setActive] = useState(false)
  const [inputValue , setInputValue] = useState('')
  const receiveable = inputValue;  
  const handleSelect = (event) => {
    setReceiptCountry(event.target.value)
  }

  const handleButton = (event) => {
    event.preventDefault();
    setInputValue(event.target[1].value)
    setActive(!active)
  }
  

    return (
        <Grid onSubmit={handleButton}>
          <div>
            <h2>환율계산</h2>
            송금국가: 미국(USD)
            <div>
              수취국가:
              <select style={{ marginLeft: '5px' }} onChange={handleSelect} >
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
              <input type="text" />
            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button style={{width:'150px', marginBottom:'20px', marginTop:'10px'}} >submit</button>
            </div>
            
            {active && (
              !inputValue|| Number(receiveable) <= 0 || receiveable > 10000 ? 
              <span style={{color:"red"}}>
                송금액이 바르지 않습니다
              </span>
              : 
              <div>
                {`수취금액은 ${receiveable} ${receiptCountry} 입니다.`}
              </div>
            )}
          </div>
        </Grid>
    )
};

export default CalculatorOne;