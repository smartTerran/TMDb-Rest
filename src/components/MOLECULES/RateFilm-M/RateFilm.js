import React from 'react';
import Hearts from '../../ATOMS/Shared-A/Hearts-A/Hearts';

import FullHeart from '../../../assets/img/full-heart.svg';
import HalfHeart from '../../../assets/img/half-heart.svg';
import EmptyHeart from '../../../assets/img/empty-heart.svg';
import c from './RateFilm.module.scss';

const rateFilm = (props) => {
  let aveRating   = null,
      starCount   = null,
      hearts      = null,
      halfCounted = false;  

  if(props.rating) {
    aveRating = <Hearts rating={props.rating} context='rateFilm' />;
  }

  if(props.userRating >= 0) {
    starCount = (Math.round(props.userRating)/2).toFixed(1);
    hearts    = Array.from({length: 5}, (_, index) => {
      let src = null,
          alt = null;

      if(index < (starCount|0)) {
        src = FullHeart;
        alt = 'Full Heart';
      } else if((starCount%1) * 10 === 5 && !halfCounted) {
        halfCounted = true;
        src = HalfHeart;
        alt = 'Half Heart';
      } else {
        src = EmptyHeart;
        alt = 'Empty Heart';
      }
      
      const type = props.isMovie ? 'movie' : 'tv';

      return (
        <div
          key={index} 
          className={c.RateFilm__HeartOverlap} 
          onMouseMove={(e) => props.mouseOver(e, index + 1)}
          onMouseOut={(e) => props.mouseOver(e, 0)}
          onClick={() => props.submitRating(type, props.videoId)}>
          <img 
            className={c.RateFilm__UserHeart}
            key={index}
            src={src}
            alt={alt} />
        </div>);
    });
  }

  return (
    <div className={c.RateFilm}>
      <div className={c.RateFilm__AveRating}>
        {aveRating}
      </div>
      <div className={c.RateFilm__UserRating}>
        {hearts}
      </div>
    </div>
  );
}
 
export default rateFilm;