import React from 'react';
import c from './Input.module.scss';

const input = (props) => {
  let inputElement = null;
  let labelElement = null;
  let { context } = props;
  let classNames = [c.Input];

  if(context === 'searchbarText') {
    classNames.push(c.Input__SearchbarText);
  } else if(context === 'searchbarSubmit') {
    classNames.push(c.Input__SearchbarSubmit);
  } else if(context === 'discoverText') {
    classNames.push(c.Input__DiscoverText);
  } else if(context === 'discoverSubmit') {
    classNames.push(c.Input__DiscoverSubmit);
  }

  // work on this later
  if(props.invalid) {
    classNames.push(c.Input_invalid);
  }

  switch(props.inputType) {
    case 'submit': 
      inputElement = <button
        className={classNames.join(' ')}
        {...props.inputConfig}
        onSubmit={props.func}>
        {props.value}
      </button>;
      break;
    case 'submitImg':
      inputElement = <img 
        className={classNames.join(' ')}
        src={props.src} 
        alt={props.alt}
        onClick={props.func} />  
      break;
    case 'text':
      inputElement = <input
        className={classNames.join(' ')}
        {...props.inputConfig}
        value={props.value}
        onChange={e => props.func(e, props.stateKey, props.updateKey)} />;
      break;
    case 'textarea':
      inputElement = <textarea 
          className={classNames.join(' ')}
          {...props.inputConfig}
          onChange={e => props.func(e, props.stateKey, props.updateKey)}>
          {props.value}
        </textarea>;
      break;
    default:
      inputElement = <input
        className={classNames.join(' ')}
        {...props.inputConfig}
        value={props.value}
        onChange={e => props.func(e, props.stateKey, props.updateKey)} />;
      break;
  }

  if(props.label) {
    labelElement = <label htmlFor={props.id}>{props.label}</label>;
  }

  return ( 
    <>
      {labelElement}
      {inputElement}
    </>
  );
}
 
export default input;