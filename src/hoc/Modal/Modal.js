import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import Backdrop from '../../components/ATOMS/UI-A/Backdrop-A/Backdrop';
import Share from '../../components/MOLECULES/Share-M/Share';
import BackBtn from '../../components/ATOMS/UI-A/ClickImage-A/ClickImage';
import close from '../../assets/img/cancel.svg';
import c from './Modal.module.scss';

class Modal extends Component {
  state = {
    isShareOpen: false
  }

  targetRef = React.createRef();
  targetElement = null;

  componentDidMount() {
    this.targetElement = this.targetRef.current;
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    this.props.modalClosed();
    enableBodyScroll(this.targetElement);
    clearAllBodyScrollLocks();
  }

  goBack = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
    this.props.modalClosed();
  }
  
  render() {
    return (
      <>      
        <Backdrop clicked={this.goBack} />
        <Share url={window.location.href} />
        <BackBtn 
          clicked={this.goBack}
          context='goBack'
          imgSrc={close}
          imgAlt='Close Modal' />
        <div ref={this.targetRef} className={c.Modal}>
          {this.props.children}
        </div>
      </>
    );
  }
}
 
export default withRouter(Modal);