import React from 'react';
import { Link } from 'react-router-dom';
import c from './FooterNavItem.module.scss';

const navItem = (props) => {
  return (
    <li className={c.FooterNavItem}>
      <Link 
        to={props.path}
        className={c.FooterNavItem__Link}>
        {props.name}
      </Link>
    </li>
  );
}
 
export default navItem;