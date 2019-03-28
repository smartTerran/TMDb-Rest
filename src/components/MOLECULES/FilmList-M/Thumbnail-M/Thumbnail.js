import React from 'react';
import { Link } from 'react-router-dom';
import FilmImage from '../../../ATOMS/Shared-A/FilmImage-A/FilmImage';
import Hearts from '../../../ATOMS/Shared-A/Hearts-A/Hearts';
import Rating from '../../../ATOMS/Shared-A/Rating-A/Rating';
import Title from '../../../ATOMS/Shared-A/Title-A/Title';
import c from './Thumbnail.module.scss';

const thumbnail = (props) => {
  let rating = null;
  let title = null;

  if(props.rating) {
    rating = (
      <div className={c.Thumbnail__Rating}>
        <Hearts
          context='thumbnail'
          rating={props.rating} />
        <Rating
          context='thumbnail'
          rating={props.rating} />
      </div>
    );
  }

  if(props.title) {
    title = <Title context='thumbnail' title={props.title} />;
  }

  // REGEX FOR VIDEO TYPE NAME
  const videoType = /[^/find/discover/profile/people][a-zA-Z]+(?=\/?)/ig.exec(props.pathBase);
  return (
    <div className={c.Thumbnail}>
      <Link 
        to={{
          pathname: props.pathBase + props.videoId,
          state: { 
            modal: true, 
            type: videoType[0], 
            pathBase: props.typePathBase
        }}}
        className={c.Thumbnail__Item}
        onClick={() => props.showVideo(props.videoId, videoType[0])}>
        <FilmImage
          context='thumbnail'
          className={c.Thumbnail__Img}
          imgSrc={props.image}
          imgAlt={props.title} />
        {rating}
      </Link>
      {title}
      
    </div>
  );
}
 
export default thumbnail;