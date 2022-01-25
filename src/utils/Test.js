import React from 'react';
import formatDate from './formatDate';
import { formatMoney, roundToTwo } from './formatMoney';

function Test() {
  return (
    <div>
      <div>{formatDate()}</div>
      <div>{formatMoney(roundToTwo(1000000.488))}</div>
    </div>
  );
}

export default Test;
