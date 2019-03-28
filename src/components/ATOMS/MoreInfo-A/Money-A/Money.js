import React from 'react';
import c from './Money.module.scss';

const money = (props) => {
  let money = <dd className={c.Money}>Not Available</dd>;
  if(props.money > 0) {
    const commaMoney = props.money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    money = <dd className={c.Money}>${commaMoney} USD</dd>;
  }
  return money;
}
 
export default money;