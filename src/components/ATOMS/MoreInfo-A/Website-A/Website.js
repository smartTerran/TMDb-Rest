import React from 'react';

import c from './Website.module.scss';

const website = (props) => (
  <h1 className={c.Website}>
    <a 
      className={c.Website__Name}
      href={props.website} 
      target='_blank'
      rel='noopener noreferrer'>
      {props.name}
    </a>
  </h1>
)
 
export default website;