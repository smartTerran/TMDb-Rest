import React from 'react';
import c from './Biography.module.scss';

const biography = (props) => {
  let bio = null;

  if(props.bio) {
    bio = (
      <div className={c.Biography}>
        <h2 className={c.Biography__Header}>Biography</h2>
        <p className={c.Biography__Text}>
          {props.bio}
        </p>
      </div>
    );

  }

  return bio;
}
 
export default biography;