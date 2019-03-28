import React from 'react';
import Toggle from '../../../../assets/img/right-arrow-button.svg';
import c from './SideDrawerToggle.module.scss';

const sideDrawerToggle = (props) => {
  let classNames = props.className ? 
    [c.SideDrawerToggle, props.className].join(' ') : c.SideDrawerToggle;

  if(!props.expanded) {
    classNames = [classNames, c.SideDrawerToggle_shrink].join(' ');
  }

  return (
    <img 
      onClick={props.expandToggle} 
      className={classNames} 
      src={Toggle} 
      alt="Side drawer toggle button"/>       
  );
}
 
export default sideDrawerToggle;