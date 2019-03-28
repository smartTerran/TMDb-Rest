import React from 'react';
import FooterNavItem from '../../../ATOMS/Footer-A/FooterNavItem-A/FooterNavItem';

import c from './FooterNavItems.module.scss';

const footerItems = (props) => {
  const footerNavItems = props.navItems.map(navItem => {
    return (
      <FooterNavItem 
        key={navItem.name} 
        path={navItem.path} 
        name={navItem.name} />)
  });
  
  return (
    <ul className={c.FooterNavItems}>
      {footerNavItems}
    </ul>
  );
}
 
export default footerItems;