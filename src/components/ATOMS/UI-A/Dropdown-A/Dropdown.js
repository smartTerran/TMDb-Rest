import React from 'react';
import c from './Dropdown.module.scss';

const dropdown = (props) => {
  const {stateKey, updateKey} = props;
  let dropdownClasses = [c.Dropdown];
  let dropdownHeaderClasses = [c.Dropdown__Header];
  let dropdownListClasses = [c.Dropdown__List];
  let dropdownItemClasses = [c.Dropdown__Item];
  
  if(props.context === 'discover') {
    dropdownClasses.push(c.Dropdown_discover);
    dropdownHeaderClasses.push(c.Dropdown__Header_discover);
    dropdownListClasses.push(c.Dropdown__List_discover);
    dropdownItemClasses.push(c.Dropdown__Item_discover);
  }
  
  const dropdown = props.options.map(option => {
    return (
      <li 
        key={option.text}
        onClick={(_) => props.selected(option.text, stateKey, updateKey)}
        className={dropdownItemClasses.join(' ')}>
        {option.text}
      </li>
    );
  })

  return (
    <div className={dropdownClasses.join(' ')}>
      <div className={dropdownHeaderClasses.join(' ')}>
        {props.value}
      </div>
      <ul className={dropdownListClasses.join(' ')}>
        {dropdown}
      </ul>
    </div>
  );
}
 
export default dropdown;