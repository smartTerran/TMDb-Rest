import React from 'react';
import c from './ClickImage.module.scss';

const image = (props) => {  
  let classNames = [c.ClickImage];
  if(props.className) {
    classNames.push(props.className);
  }

  if(props.context === 'arrowRound') {
    classNames.push(c.ClickImage__ArrowRound);
  } else if(props.context === 'bookmark') {
    if(props.isFavorited) {
      classNames.push([c.ClickImage__Bookmark, c.ClickImage__Bookmark_fav].join(' '));
    } else {
      classNames.push(c.ClickImage__Bookmark);
    }
  } else if(props.context === 'goBack') {
    classNames.push(c.ClickImage__GoBack);    
  }

  let func = props.clicked;
  if(props.clicked && props.args) {
    func = () => props.clicked(...props.args);
  } else if(props.onClick) {
    // onClick given by React Slick Carousel
    func = props.onClick;
  }
  
  return <img 
    className={classNames.join(' ')} 
    src={props.imgSrc} 
    alt={props.imgAlt}
    onClick={func} />;
}
 
export default image;