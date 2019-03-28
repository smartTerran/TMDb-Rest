import React from 'react';
import Input from '../../../ATOMS/UI-A/Input-A/Input';
import c from './Searchbar.module.scss';

const searchbar = (props) => {
  const input = props.searchbar.searchInput;
  const submit = props.searchbar.submit;

  let classNames = Array.isArray(props.className) ? 
    [c.Searchbar, ...props.className] : props.className ? 
    [c.Searchbar, props.className] : [c.Searchbar];
  
  return (
    <form className={classNames.join(' ')} onSubmit={props.onSubmit}>
      <Input 
        classNames={c.Searchbar__Input}
        context='searchbarText'
        inputType={input.config.type} 
        inputConfig={input.config} 
        value={input.value}
        stateKey={input.stateKey}
        updateKey={input.updateKey}
        func={props.onChange} />
      <Input 
        classNames={c.Searchbar__Submit}
        context='searchbarSubmit'
        inputType={submit.config.type} 
        inputConfig={submit.config} 
        src={submit.src}
        alt={submit.alt}
        func={props.onSubmit} />
    </form>
  );
}
 
export default searchbar;