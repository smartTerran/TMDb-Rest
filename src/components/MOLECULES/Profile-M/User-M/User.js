import React from 'react';
import Image from '../../../ATOMS/Shared-A/FilmImage-A/FilmImage';
import Title from '../../../ATOMS/Shared-A/Title-A/Title';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';

import avatar from '../../../../assets/img/user.svg';
import c from './User.module.scss';

const user = (props) => {
  let name          = null;
  let createAccount = null;

  if(props.isGuest) {
    createAccount = (
      <a 
        className={c.User__CreateAccount} 
        href="https://www.themoviedb.org/account/signup" 
        target='_blank' 
        rel='noreferrer noopener'>Create an Account</a>
    );

    name = (
      <Title 
        context='profile'
        title={'Welcome ' + props.userName} />
    );
  } else {
    name = (
      <>
        <Title 
          context='profile'
          title={'Welcome ' + props.userName} />
        <a 
          className={c.User__CreateAccount} 
          href={"https://www.themoviedb.org/u/" + props.userName} 
          target='_blank' 
          rel='noreferrer noopener'>
          <Subtitle
            context='profile'
            subtitle={props.name || props.userName} />
        </a>
      </>
    )
  }

  return (
    <figure className={c.User}>
      <Image
        context='avatar'
        imgSrc={avatar}
        imgAlt='User Avatar' />
      <figcaption className={c.User__Caption}>
        {name}
        {createAccount}
      </figcaption>
    </figure>
  );
}
 
export default user;