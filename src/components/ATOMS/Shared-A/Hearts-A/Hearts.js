import React from 'react';
import FullHeart from '../../../../assets/img/full-heart.svg';
import HalfHeart from '../../../../assets/img/half-heart.svg';
import EmptyHeart from '../../../../assets/img/empty-heart.svg';
import c from './Hearts.module.scss';

const hearts = (props) => {
  let classNames = null;    
  if(props.context === 'carousel') {
    classNames = props.className ? 
      [c.Hearts__Carousel, props.className].join(' ') : 
      c.Hearts__Carousel;
  } else if(props.context === 'thumbnail') {
    classNames = props.className ? 
    [c.Hearts__Thumbnail, props.className].join(' ') : 
    c.Hearts__Thumbnail;
  } else if(props.context === 'rateFilm') {
    classNames = c.Hearts__RateFilm;
  } else if(props.context === 'work') {
    classNames = c.Hearts__Work;
  }

  const starCount = (Math.round(props.rating)/2).toFixed(1);
  let halfCounted = false;
  
  const hearts = Array.from({length: 5}, (_, index) => {
    if(index < (starCount|0)) {
      return <img 
        className={classNames}
        key={index} 
        src={FullHeart} 
        alt='Full Heart' />;
    } else if((starCount%1) * 10 === 5 && !halfCounted) {
      halfCounted = true;
      return <img 
        className={classNames}
        key={index}
        src={HalfHeart}
        alt='Half Heart' />;
    } 
    return <img 
      className={classNames}
      key={index}
      src={EmptyHeart}
      alt='Empty Heart' />;
  });

  return <span className={c.Hearts}>{hearts}</span>;
}
 
export default hearts;
