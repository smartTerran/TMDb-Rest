import React from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import c from './Backdrop.module.scss';

const backdrop = (props) => (
  <CSSTransition
    in={props.location.state && props.location.state.modal}
    appear
    mountOnEnter
    unmountOnExit
    timeout={1500}
    classNames={{
      appear: c.Backdrop_appear,
      appearActive: c.Backdrop_appear_active,
      enterDone: c.Backdrop_enter_done
    }}>
    <div 
      className={c.Backdrop}
      onClick={props.clicked}>
    </div>  
  </CSSTransition>
);

export default withRouter(backdrop);