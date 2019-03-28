import React from 'react';
import NavItem from '../../../ATOMS/Navigation-A/NavItem-A/NavItem';
import c from './NavItems.module.scss';

const navItems = (props) => {
  const navItems = props.navItems.map(navItem => {
    return <NavItem 
      key={navItem.name} 
      {...navItem} 
      isSidedrawer={props.isSidedrawer} />
  });
  
  let classNames = props.className ? 
    [c.NavItems, props.className] : [c.NavItems];

  if(props.isOpen) {
    classNames.push(c.NavItems_open);
  }

  return (
    <ul className={classNames.join(' ')}>
      {navItems}
    </ul>
  );
}
 
export default navItems;