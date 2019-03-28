import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logout from '../../../../assets/img/logout.svg';
import profile from '../../../../assets/img/profile.png';
import c from './NavItem.module.scss';

const navItem = (props) => {
  let content     = null;
  let dropdown    = null;
  let wrapperClasses = c.NavItem;
  let linkClasses  = c.NavItem__Link;

  if(props.navType === 'img' && !props.isSidedrawer) {
    content = <img 
      className={c.NavItem__Img} 
      src={props.imgSrc} 
      alt={props.imgAlt} />
  } else if((props.name && !props.imgSrc) || props.isSidedrawer) {
    content = props.name;
  } 

  if(props.hasOwnProperty('auth') && props.auth) {
    wrapperClasses = c.NavItemAuth;
    linkClasses = c.NavItemAuth__AuthLink;
    content = <span className={c.NavItemAuth__Text}>{props.name}</span>
    dropdown = (
      <ul className={c.NavItemAuth__Dropdown}>
        <li className={c.NavItemAuth__DropItem}>
          <Link className={c.NavItemAuth__DropItem_link} to={props.path}>
            Profile
            <img 
              className={c.NavItemAuth__DropItem_img} 
              src={profile} 
              alt="Profile"/>
          </Link>
        </li>
        <li className={c.NavItemAuth__DropItem} onClick={props.onLogout}>
          Logout
          <img 
            className={c.NavItemAuth__DropItem_img} 
            src={logout} 
            alt="Logout"/>
        </li>
      </ul>
    )
  }

  return (
    <li className={wrapperClasses}>
      <NavLink 
        to={props.path}
        className={linkClasses}
        activeClassName={c.NavItem_active}>
        {content}
      </NavLink>
      {dropdown}
    </li>
  );

}
 
export default navItem;