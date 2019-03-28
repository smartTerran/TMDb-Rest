import React from 'react';
import c from './Name.module.scss';

const name = (props) => {
  let classNames = null;
  if(props.context === 'review') {
    classNames = [c.Name, c.Name__Review].join(' ');
  } else if(props.context === 'staff') {
    classNames = [c.Name, c.Name__Staff].join(' ');
  }
  
  return (
    <h4 className={classNames}>{props.name}</h4>
  );
};
 
export default name;