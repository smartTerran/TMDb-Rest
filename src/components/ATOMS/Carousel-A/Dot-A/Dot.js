import React from 'react';
import c from './Dot.module.scss';

const dot = (props) => {
  const classNames = props.active ? 
    [c.Dot, c.Dot_active].join(' ') : 
    c.Dot;
    
  const dot = props.active ? 
    <div className={classNames} ></div> : 
    <div className={classNames} onClick={() => props.clicked(props.id)}></div>;

  return dot;
};
 
export default dot;