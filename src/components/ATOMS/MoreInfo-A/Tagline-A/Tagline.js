import React from 'react';
import c from './Tagline.module.scss';

const tagline = (props) => (
  <h2 className={c.Tagline}>{props.tagline}</h2>
)
 
export default tagline;