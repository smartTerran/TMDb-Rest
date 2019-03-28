import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../../ATOMS/Carousel-A/Header-A/Header';
import Genre from '../../../ATOMS/Shared-A/Genre-A/Genre';
import Title from '../../../ATOMS/Shared-A/Title-A/Title';
import Rating from '../../../ATOMS/Shared-A/Rating-A/Rating';
import Hearts from '../../../ATOMS/Shared-A/Hearts-A/Hearts';
import FilmImage from '../../../ATOMS/Shared-A/FilmImage-A/FilmImage';

import c from './Info.module.scss';

const info = (props) => {  
  // REGEX FOR VIDEO TYPE NAME
  const videoType = /\w+/ig.exec(props.pathBase);
  
  return ( 
    <Link 
      to={{
        pathname: props.pathBase + props.videoId,
        state: { modal: true, type: videoType[0] } }}
      className={c.Info}
      onClick={() => props.showVideo(props.videoId)}>
      <FilmImage
        context='carousel'
        className={c.Info__Img}
        imgSrc={props.videoImage} 
        imgAlt={props.videoTitle} />
      <div className={c.Info__Text}>
        <Header>In Theatres Now</Header>
        <Title 
          context='carousel'
          title={props.videoTitle} />
        <div className={c.Info__Rating}>
          <Genre 
            context='carousel'
            genre={props.videoGenre[0]} />
          <Hearts 
            context='carousel'
            rating={props.videoRating} />
          <Rating 
            context='carousel'
            rating={props.videoRating} />
        </div>
      </div>
    </Link>
  );
}
 
export default info;