import React from 'react';
import c from './FooterName.module.scss';

const footerName = (props) => {
  return <h1 className={c.FooterName}>{props.name}</h1>;
}
 
export default footerName;