import React from 'react';
import c from './Category.module.scss';

const category = (props) => {
  return ( 
    <h3 
      className={c.Category}>
      <span className={c.Category__Text}>
        {props.category}
      </span>
    </h3>
  );
}
 
export default category;