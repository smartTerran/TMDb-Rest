import React from 'react';
import moment from 'moment';

import Image from '../../../ATOMS/Shared-A/FilmImage-A/FilmImage';
import Title from '../../../ATOMS/Shared-A/Title-A/Title';
import c from './Header.module.scss';

const header = (props) => {
  const style = {
    backgroundImage: `linear-gradient(to left, rgba(0,0,0,.6), rgba(25,25,25,.3)), url(${props.backdrop})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%'
  }

  let birthday = null;
  let age = null;
  let deathday = 'Current';
  
  if(props.birthday) {
    birthday = moment(props.birthday).format('MMM Do, YYYY');
    age = moment().diff(moment(props.birthday), 'years');
  }

  if(props.deathday) {
    deathday = props.deathday;
    age = moment(props.deathday).diff(moment(props.birthday));
  }


  return (
    <header className={c.Header} style={style}>
      <div className={c.Header__Person}>
        <Image 
          imgSrc={props.profilePicture} 
          imgAlt={props.name} 
          context='person' />
        <div className={c.Header__Info}>
          <Title context='work' title={props.name} className={c.Header__Name} />
          <p className={c.Header__Job}>
            <span className={c.Header__Gender}>{props.gender}</span>
            <span className={c.Header__Department}>{props.department}</span>
          </p>
          <p className={c.Header__Birth}>
            <span className={c.Header__Birthplace}>{props.birthPlace}</span>
            <span className={c.Header__Birthday}>{birthday} - {deathday} ({age} yrs)</span>
          </p>
        </div>
      </div>
    </header>
  );
}
 
export default header;