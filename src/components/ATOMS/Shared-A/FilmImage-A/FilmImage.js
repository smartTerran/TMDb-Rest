import React from 'react';
import c from './FilmImage.module.scss';

const image = (props) => {      
  let classNames = null;    
  if(props.context === 'carousel') {
    classNames = props.className ? 
      [c.FilmImage__Carousel, props.className].join(' ') : 
      c.FilmImage__Carousel;
  } else if(props.context === 'thumbnail') {
    classNames = props.className ? 
      [c.FilmImage__Thumbnail, props.className].join(' ') : 
      c.FilmImage__Thumbnail;
  } else if(props.context === 'avatar') {
    classNames = props.className ? 
      [c.FilmImage__Avatar, props.className].join(' ') : 
      c.FilmImage__Avatar;
  } else if(props.context === 'person') {
    classNames = c.FilmImage__Person;
  }
  
  return <img 
    className={classNames} 
    src={props.imgSrc} 
    alt={props.imgAlt} />;
}
 
export default image;