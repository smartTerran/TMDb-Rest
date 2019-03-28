import React from 'react';
import c from './Button.module.scss';

const button = (props) => {
  let buttonText = 'Hide Credits';
  if(!props.showCredits) {
    buttonText = 'Show Credits'
  }
  return (
    <button className={c.Button} onClick={props.clicked}>
      {buttonText}
    </button>
  );
}
 
export default button;