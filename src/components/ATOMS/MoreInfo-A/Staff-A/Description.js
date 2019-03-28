import React from 'react';
import c from './Description.module.scss';

const description = (props) => {
  let classNames = null;
  switch(props.descType) {
    case 'job':
      classNames = [c.Description, c.Description__Job].join(' ');
      break;
    case 'department':
      classNames = [c.Description, c.Description__Department].join(' ');  
      break;  
    case 'character': 
      classNames = [c.Description, c.Description__Character].join(' ');
      break;
    case 'country':
      classNames = [c.Description, c.Description__Country].join(' ');
      break;
    default:
      classNames = c.Description;
      break;
  }

  return <span className={classNames}>{props.desc}</span>;
};
 
export default description;