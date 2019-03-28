import React from 'react';
import c from './Title.module.scss';

const title = (props) => {
  let classNames = null;    
  const { context, title, className } = props;
  
  if(context === 'carousel') {
    classNames = className ? 
      [c.Title__Carousel, className].join(' ') : 
      c.Title__Carousel;
  } else if(context === 'thumbnail') {
    classNames = className ? 
      [c.Title__Thumbnail, className].join(' ') : 
      c.Title__Thumbnail;
  } else if(context === 'search' || context === 'discover' || context === 'login') {
    classNames = c.Title__Search;
  } else if(context === 'profile') {
    classNames = c.Title__Profile;
  } else if(context === 'work') {
    classNames = className ? [c.Title__Work, className].join(' ') : c.Title__Work;
  }

  return (
    <h1 className={classNames}>{title}</h1>
  )
};
 
export default title;