import React from 'react';
import c from './Overview.module.scss';
import arrowDown from '../../../../assets/img/arrow-down.svg';

const overview = (props) => {
  const classNames = props.expanded ? 
    [c.Overview, props.className] : 
    [c.Overview, props.className, c.Overview_less];
  
  const arrowClasses = props.expanded ? 
    [c.Overview__Arrow] : 
    [c.Overview__Arrow, c.Overview__Arrow_less];

  let expandArrow = <img className={arrowClasses.join(' ')} src={arrowDown} alt="Expand Arrow"/>;
  if(props.context === 'work') {
    classNames.push(c.Overview__Work);
    expandArrow = null;
  }
  
  return (
    <p 
      className={classNames.join(' ')}
      onClick={props.clicked}>
      {props.overview}
      {expandArrow}
    </p>
  )
};
 
export default overview;