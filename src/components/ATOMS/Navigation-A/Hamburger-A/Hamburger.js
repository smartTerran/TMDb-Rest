import React from 'react';
import c from './Hamburger.module.scss';

const hamburger = (props) => {
  let classes = [c.Hamburger];
  if(props.open) {
    classes.push(c.Hamburger_open);
  }

  return ( 
    <div className={classes.join(' ')} onClick={props.toggle}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
 
export default hamburger;