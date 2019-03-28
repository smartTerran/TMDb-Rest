import React from 'react';
import Input from '../../../ATOMS/UI-A/Input-A/Input';
import Dropdown from '../../../ATOMS/UI-A/Dropdown-A/Dropdown';
import c from './Filters.module.scss';

const filters = (props) => {
  let textFilters = [];
  let dropdownFilters = [];

  if(props.filters) {
    Object.entries(props.filters).forEach(([filterKey, filterData]) => {
      if(filterData.inputType === 'text') {
        textFilters.push(
          <Input 
            context='discoverText'
            key={filterKey}
            stateKey={props.stateKey}
            updateKey={filterKey} 
            func={props.inputChanged} 
            {...filterData} />
        );
      } else if(filterData.inputType === 'select') {
        dropdownFilters.push(
          <Dropdown 
            key={filterKey} 
            context='discover'
            stateKey={props.stateKey}
            updateKey={filterKey}
            selected={props.inputChanged}
            {...filterData} />
        );
      }
    });
  }

  const submitBtn = (
    <Input 
      context='discoverSubmit'
      inputType='submit' 
      inputConfig={{type: 'submit', placeholder: 'Apply'}} 
      value={'Apply'}
      func={props.applyFilters} />
  );

  return (
    <form className={c.Filters} onSubmit={props.applyFilters}>
      {textFilters}
      {dropdownFilters}
      {submitBtn}
    </form>
  );
}
 
export default filters;