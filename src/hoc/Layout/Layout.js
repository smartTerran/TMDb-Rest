import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from '../../components/ORGANISMS/Navigation-O/Navigation';
import Sidedrawer from '../../components/ORGANISMS/Sidedrawer-O/Sidedrawer';
import Footer from '../../components/ORGANISMS/Footer-O/Footer';
import Message from '../../components/ATOMS/UI-A/Message-A/Message';
import Hamburger from '../../components/ATOMS/Navigation-A/Hamburger-A/Hamburger';

import movie from '../../assets/img/movie.svg';
import tv from '../../assets/img/tv.svg';
import compass from '../../assets/img/compass.svg';
import c from './Layout.module.scss';
import * as u from '../../shared/Utility';
import * as actionsProfile from '../../store/actions/ProfileActions';

class Layout extends Component {
  state = { 
    showSideDrawer: false,
    navItems: {
      movies: {
        name: 'Movies',
        navType: 'img',
        imgSrc: movie,
        imgAlt: 'Movies Nav',
        path: '/movie'
      },
      tv: {
        name: 'TV',
        navType: 'img',
        imgSrc: tv,
        imgAlt: 'TV Nav',
        path: '/tv'
      },
      discover: {
        name: 'Discover',
        navType: 'img',
        imgSrc: compass,
        imgAlt: 'Discover Nav',
        path: '/discover'
      },
      login: {
        name: 'Login',
        path: '/login',
        auth: false
      },
      profile: {
        name: 'Profile',
        path: '/profile',
        auth: true
      }
    },
    open: false
  }

  componentDidUpdate(_, prevState) {
    if(this.state.open && prevState.open) {
      this.setState({ open: false });
    }
  }

  toggleSidedrawerHandler = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  render() { 
    let messages = null;
    if(u.isArrayGT(this.props.validationMessages, 0)) {
      messages = this.props.validationMessages.map(message => (
        <Message 
          key={message.id} 
          clearValidationMessage={this.props.onClearValidationMessage} 
          {...message} />
      ));
      
      messages = <div className={c.Layout__Message}>{messages}</div>;
    }

    let layoutClasses = [c.Layout];
    if(this.state.open) {
      layoutClasses.push(c.Layout_open)
    }

    return (
      <>
        {messages}
        <div className={layoutClasses.join(' ')}>
          <Navigation 
            navItems={this.state.navItems}
            loggedIn={this.props.loggedIn}
            profile={this.props.profile}
            toggleSidedrawer={this.toggleSidedrawerHandler}
            isOpen={this.state.open} />
          <Hamburger 
            open={this.state.open}
            toggle={this.toggleSidedrawerHandler} />
          <Sidedrawer
            navItems={this.state.navItems}
            open={this.state.open}
            loggedIn={this.props.loggedIn} />
          <main className={c.Layout__Main}>{this.props.children}</main>
          <Footer 
            navItems={this.state.navItems}
            loggedIn={this.props.loggedIn}
            profile={this.props.profile} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    validationMessages: state.profile.validationMessages,
    loggedIn: state.login.loggedIn,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearValidationMessage: () => dispatch(actionsProfile.clearValidationMessage())
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Layout);