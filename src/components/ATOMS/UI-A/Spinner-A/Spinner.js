import React from 'react';
import { CSSTransition } from 'react-transition-group';
import c from './Spinner.module.scss';

const spinner = (props) => {
  const duration = 2000;
  let spinner = (
    <div className={c.SpinnerWrapper}>
      <h1 className={c.SpinnerText__Title}>Film Base</h1>
      <div className={c.Spinner}>
        <div className={[c.Spinner__Cube_1, c.Spinner__Cube].join(' ')}></div>
        <div className={[c.Spinner__Cube_2, c.Spinner__Cube].join(' ')}></div>
        <div className={[c.Spinner__Cube_4, c.Spinner__Cube].join(' ')}></div>
        <div className={[c.Spinner__Cube_3, c.Spinner__Cube].join(' ')}></div>
      </div>
      <h2 className={c.SpinnerText__Subtitle}>{props.pageTitle}</h2>
    </div>
  );
  
  if(!!!props.suspense) {
    spinner = (
      <CSSTransition
        in={props.loading}
        appear
        timeout={duration}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: c.SpinnerWrapper_enter,
          exitActive: c.SpinnerWrapper_exit_active,
          exitDone: c.SpinnerWrapper_exit_done
        }}>
        {spinner}
      </CSSTransition>
    );
  }

  return spinner;
}
 
export default spinner;