import React from 'react';
import c from './Header.module.scss';

const header = (props) => (
  <h2 className={c.Header}>{props.children}</h2>
);
 
export default header;