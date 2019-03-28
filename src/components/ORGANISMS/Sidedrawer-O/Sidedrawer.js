import React from 'react';

import NavItems from '../../MOLECULES/Navigation-M/NavItems-M/NavItems';
import c from './Sidedrawer.module.scss';

const sidedrawer = (props) => {
  let navigationLinks = [];
  for (let key in props.navItems) {
    const newItem = {...props.navItems[key]};
    
    if(newItem.hasOwnProperty('auth') && newItem.auth === props.loggedIn) {
      navigationLinks.push(newItem);
    } else if(!newItem.hasOwnProperty('auth')) {
      navigationLinks.push(newItem);
    }
  }

  let classNames = [c.Sidedrawer];
  if(props.open) {
    classNames.push(c.Sidedrawer_open);
  }
  
  return ( 
    <nav className={classNames.join(' ')}>
      <NavItems 
        navItems={navigationLinks} 
        isOpen={props.open}
        isSidedrawer />
    </nav> 
  );
}
 
export default sidedrawer;