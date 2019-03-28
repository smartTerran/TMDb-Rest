import React from 'react';
import c from './Rating.module.scss';

const rating = (props) => {
  let classNames = null;    
  if(props.context === 'carousel') {
    classNames = props.className ? 
      [c.Rating__Carousel, props.className].join(' ') : 
      c.Rating__Carousel;
  } else if(props.context === 'thumbnail') {
    classNames = props.className ? 
      [c.Rating__Thumbnail, props.className].join(' ') : 
      c.Rating__Thumbnail;
  }

  return <h3 className={classNames}>{props.rating}</h3>;
};
 
export default rating;