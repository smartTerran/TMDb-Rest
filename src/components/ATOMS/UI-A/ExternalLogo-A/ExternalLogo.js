import React from 'react';
import c from './ExternalLogo.module.scss';

const logo = (props) => {  
  let classNames = null;
  if(props.type === 'logo') {
    classNames = c.ExternalLogo__Logo;
  } else if(props.type === 'credit') {
    classNames = c.ExternalLogo__Credit;
  }

  return (
    <a     
      href={props.url} 
      className={c.ExternalLogo}
      target='_blank'
      rel='noopener noreferrer' >
      <img 
        className={classNames} 
        src={props.imgSrc} 
        alt={props.imgAlt} />
    </a>
  );
}
 
export default logo;