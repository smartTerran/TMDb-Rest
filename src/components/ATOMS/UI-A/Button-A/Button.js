import React from 'react';
import c from './Button.module.scss';
import * as u from '../../../../shared/Utility';

const button = (props) => {
  let func = null;
  let classNames = [c.Button];

  if(props.btnClicked) {
    func = props.btnClicked;

    if(props.buttonArgs) {
      func = (e) => props.btnClicked(e, props.buttonArgs);
    } else if(u.isArrayGT(props.buttonArgs, 0)) {
      func = (e) => props.btnClicked(e, ...props.buttonArgs)
    }
  }

  if(props.context === 'login') {
    classNames.push(c.Button__Login);
  } else if(props.context === 'logout') {
    classNames.push(c.Button__Logout);
  }
  
  if(props.isLink) {
    return (
      <a 
        href={props.href}
        target={props.target}
        rel='noopener noreferrer'
        className={classNames.join(' ')}>
        <span className={c.Button__Text}>
          {props.text}
        </span>
      </a> 
    )
  } else {
    return (
      <button 
        className={classNames.join(' ')}
        onClick={func}>
        <span className={c.Button__Text}>
          {props.text}
        </span>
      </button> 
    )
  }
}
 
export default button;