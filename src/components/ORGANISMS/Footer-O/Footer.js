import React, { Component } from 'react';
import FooterNavItems from '../../MOLECULES/Footer-M/FooterNavItems-M/FooterNavItems';
import FooterName from '../../ATOMS/Footer-A/FooterName-A/FooterName';
import Copyright from '../../ATOMS/UI-A/Copyright-A/Copyright';
import FooterCredits from '../../ATOMS/Footer-A/FooterCredits-A/FooterCredits';
import ExternalLogos from '../../MOLECULES/Footer-M/ExternalLogos/ExternalLogos';
import Button from '../../ATOMS/Footer-A/Button-A/Button';

import linkedin from '../../../assets/img/linkedin.svg';
import github from '../../../assets/img/github.svg';
import codepen from '../../../assets/img/codepen.png';
import moviedb from '../../../assets/img/moviedb.svg';
import youtube from '../../../assets/img/youtube.png';
import c from './Footer.module.scss';

class Footer extends Component {
  state = {
    links: [
      {
        name: 'LinkedIn', 
        url: 'https://www.linkedin.com/in/choi-mike/',
        type: 'logo',
        img: linkedin
      },
      {
        name: 'GitHub', 
        url: 'https://github.com/mikec-git',
        type: 'logo',
        img: github
      },
      {
        name: 'CodePen', 
        url: 'https://codepen.io/mikec-git/',
        type: 'logo',
        img: codepen
      },
      {
        name: 'TheMovieDB', 
        url: 'https://www.themoviedb.org/',
        type: 'credit',
        img: moviedb
      },
      {
        name: 'Youtube', 
        url: 'https://developers.google.com/youtube/',
        type: 'credit',
        img: youtube
      }
    ],
    showCredits: false
  }

  creditButtonClickedHandler = () => {
    this.setState(prevState => ({ showCredits: !prevState.showCredits }));
  }

  render () {
    let footerNavItems = [];
    for(let key in this.props.navItems) {
      const newItem = {...this.props.navItems[key]};
      if(newItem.hasOwnProperty('auth') && newItem.auth === this.props.loggedIn) {
        footerNavItems.push(newItem);
      } else if(!newItem.hasOwnProperty('auth')) {
        footerNavItems.push(newItem);
      }
    }

    let credits = (
      <div className={c.Footer__CreditsList}>
        <FooterCredits />
      </div>
    );

    if(this.state.showCredits) {
      const creditsClasses = [c.Footer__CreditsList, c.Footer__CreditsList_show].join(' ');
      credits = (
        <div className={creditsClasses}>
          <p className={c.Footer__CreditsList_text}>Icons Used</p>
          <FooterCredits />
        </div>
      );
    }
  
    return ( 
      <footer className={c.Footer}>
        <nav className={c.Footer__Nav}>
          <FooterName name='Film Base' />
          <FooterNavItems navItems={footerNavItems} />
        </nav>
        <div className={c.Footer__External}>
          <ExternalLogos 
            links={this.state.links.filter(link => link.type === 'logo')} />
        </div>
        <div className={c.Footer__API}>
          <ExternalLogos 
            links={this.state.links.filter(link => link.type === 'credit')} />
        </div>
        <div className={c.Footer__Credits}>
          <Copyright />
          {credits}
          <Button 
            clicked={this.creditButtonClickedHandler} 
            showCredits={this.state.showCredits} />
        </div>
      </footer>
    );
  }
}
 
export default Footer;