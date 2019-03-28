import React, { Component } from 'react';

import share from '../../../assets/img/share.svg';
import email from '../../../assets/img/email.svg';
import twitter from '../../../assets/img/twitter.svg';
import reddit from '../../../assets/img/reddit.svg';
import facebook from '../../../assets/img/facebook.svg';

import c from './Share.module.scss';

class Share extends Component {
  state = {
    isOpen: false,
    shareTo: [
      { 
        to: 'mailto:',
        img: email,
        alt: 'Email to',
        style: {
          backgroundColor: '#71cc49',
          borderRadius: '50%',
          padding: '.5rem'
        },
        isMailTo: true
      },
      { 
        to: `http://www.facebook.com/sharer.php?u=${this.props.url}`,
        img: facebook,
        alt: 'Share on Facebook'
      },
      { 
        to: `https://plus.google.com/share?url=${this.props.url}`, 
        img: "https://www.gstatic.com/images/icons/gplus-32.png",
        alt: "Share on Google+"
      },
      { 
        to: `https://www.reddit.com/submit?url=${this.props.url}&amp%3Btitle=Film%20Base`,
        img: reddit,
        alt: 'Share on Reddit',
        style: {
          backgroundColor: '#FF4500',
          borderRadius: '50%',
          padding: '.5rem'
        }
      },
      { 
        to: `https://twitter.com/intent/tweet?url=${this.props.url}&amp;hashtags=filmbase&amp;text=Film%20Base`,
        img: twitter,
        alt: 'Share on Twitter'
      },
      {
        img: share,
        alt: 'Share Expand',
        isToggle: true
      }
    ]
  };
  
  toggleOpenHandler = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    let shareIcons = null;
    if(this.props.url) {
      shareIcons = this.state.shareTo.map(share => {
        const target = share.isMailTo ? null : '_blank';
        if(!share.isToggle) {
          return (
            <a key={share.alt} href={share.to} className={c.Share__Link} target={target} rel="noopener noreferrer">
              <img className={c.Share__Icon} style={share.style} src={share.img} alt={share.alt} />
            </a>
          );
        } 
        return null;
      })
    }

    let toggle = this.state.shareTo.find(share => share.isToggle);
    let classNames    = [c.Share__Group];
    let toggleClasses = [c.Share__Toggle];
    if(this.state.isOpen) {
      classNames.push(c.Share__Group_open);
      toggleClasses.push(c.Share__Toggle_open);
    }

    return (
      <div className={c.Share}>
        <div className={toggleClasses.join(' ')} onClick={this.toggleOpenHandler}>
          <img className={c.Share__Icon} src={toggle.img} alt={toggle.alt}/>
        </div>
        <div className={classNames.join(' ')}>
          {shareIcons}
        </div>
      </div>
    );
  }
}
 
export default Share;