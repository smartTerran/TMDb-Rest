import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Searchbar from '../../MOLECULES/Navigation-M/Searchbar-M/Searchbar';
import NavItems from '../../MOLECULES/Navigation-M/NavItems-M/NavItems';
import Image from '../../ATOMS/UI-A/ClickImage-A/ClickImage';

import Search from '../../../assets/img/search.svg';
import Logo from '../../../assets/img/Logo.svg';
import c from './Navigation.module.scss';
import * as u from '../../../shared/Utility';
import * as actionsLogin from '../../../store/actions/LoginActions';

class Navigation extends Component {
  navRef = React.createRef();

  state = { 
    searchbar: {
      searchInput: { 
        stateKey: 'searchbar',
        updateKey: 'searchInput',
        config: { 
          type: 'text',
          placeholder: 'Search...'
        },
        value: ''
      },
      submit: { 
        config: { type: 'submitImg' },
        src: Search,
        alt: 'Search'
      },
      touched: false
    }
  };
    
  componentDidMount() {
    window.addEventListener('scroll', this.pageScrollingHandler);
    this.scrollDirDown = true; // true == down
    this.curScrollPos = window.scrollY;
  }

  pageScrollingHandler = () => {
    if(this.navRef && this.navRef.current && window.innerWidth > 800) {
      this.scrollDirDown  = (window.scrollY - this.curScrollPos) >= 0;
      this.curScrollPos   = window.scrollY;
      const navStyle      = this.navRef.current.style;
      navStyle.transform  = !this.scrollDirDown && this.curScrollPos > navStyle.height ? 'translateY(-100%)' : 'translateY(0)';
    } else {
      const navStyle      = this.navRef.current.style;
      navStyle.transform  = 'translateY(0)';
    }
  }

  updateInputValue = (e, stateKey, updateKey) => {
    this.setState({
      [stateKey]: u.setStateDirectChildValue(stateKey, updateKey, e.target.value, this.state), 
      touched: true
    });
  }
    
  searchSubmitHandler = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      this.props.history.replace({
        pathname: '/find',
        search: `?q=${this.state.searchbar.searchInput.value}`
      });
      return {
        searchbar: {
          ...prevState.searchbar,
          searchInput: {...prevState.searchbar.searchInput, value: ''}
      }};
    });
  }

  logoClickedHandler = () => {
    this.props.history.push('/movie');
  }

  render() { 
    let navigationLinks = [];
    for (let key in this.props.navItems) {
      const newItem = {...this.props.navItems[key]};
      
      if(newItem.hasOwnProperty('auth') && newItem.auth === this.props.loggedIn) {
        if(newItem.auth && this.props.loggedIn && this.props.profile) {
          newItem.name      = this.props.profile.userName.slice(0,1).toUpperCase();
          newItem.onLogout  = this.props.onLogout;
        }
        navigationLinks.push(newItem);
      } else if(!newItem.hasOwnProperty('auth')) {
        navigationLinks.push(newItem);
      }
    }

    return (
      <nav className={c.Navigation} ref={this.navRef}>
        <Image
          className={c.Navigation__Logo}
          clicked={this.logoClickedHandler}
          imgSrc={Logo}
          imgAlt='FilmBase Logo' />
        <Searchbar 
          className={c.Navigation__Searchbar}
          searchbar={this.state.searchbar} 
          onChange={this.updateInputValue}
          onSubmit={this.searchSubmitHandler} />
        <NavItems 
          className={c.Navigation__NavItems}
          navItems={navigationLinks} />
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionsLogin.logout())
  }
}
 
export default withRouter(connect(null, mapDispatchToProps)(Navigation));