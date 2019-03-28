import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/ORGANISMS/Header-O/Header';
import BgImages from '../../components/MOLECULES/Login-M/BgImages-M/BgImages';

import c from './Login.module.scss';
import * as actions from '../../store/actions/LoginActions';

class Login extends Component {
  state = {
    buttons: {
      login: {
        value: 'Login',
        inputConfig: {
          type: 'login'
        }
      },
      guest: {
        value: 'Browse as Guest*',
        inputConfig: {
          type: 'guest'
        }
      },
      newAcc: {
        value: 'Create a New Account',
        inputConfig: {
          type: 'link',
          href: 'https://www.themoviedb.org/account/signup'
        }
      }
    },
    fineprint: {
      value: '*Guest has limited access to features'
    }
  }

  componentDidMount() {
    this.props.onGetLoginInit();
    let searchParams = new URLSearchParams(this.props.location.search);

    if(searchParams && searchParams.get('approved')) {
      this.props.onLoginApproved(searchParams.get('request_token'));
      this.props.history.replace('/profile');
    } else if(searchParams && !searchParams.get('approved')) {
      this.props.onLoginUnapproved();
      this.props.history.replace('/login');
    } else if(!localStorage.getItem('session')) {
      this.props.history.replace('/login');
      // ADD STATE TO MAYBE SHOW VALIDATION (ERROR YOU CANT ACCESS THIS)
    }
    window.scrollTo(0, 0);
  }
  
  loginClickedHandler = (e, args) => {
    e.preventDefault();
    this.props.onLogin(args.type);
  }

  render() { 
    return ( 
      <div className={c.Login}>
        <Header 
          context='login' 
          headerTitle='Login'
          fineprint={this.state.fineprint}
          buttons={this.state.buttons}
          btnClicked={this.loginClickedHandler} />
        <BgImages
          images={this.props.images} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.login.loginImages,
    loadingInit: state.login.loadingInit,
    requesting: state.login.requesting,
    loggedIn: state.login.loggedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetLoginInit: () => dispatch(actions.getLoginInit()),
    onLogin: (type) => dispatch(actions.login(type)),
    onLoginApproved: (token) => dispatch(actions.loginApproved(token)),
    onLoginUnapproved: () => dispatch(actions.loginUnapproved())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);