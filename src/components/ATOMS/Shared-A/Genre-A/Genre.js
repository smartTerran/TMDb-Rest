import React from 'react';
import c from './Genre.module.scss';

const genre = (props) => {
  if(props.context === 'carousel') {
    return <span className={c.Genre__Carousel}>{props.genre}</span>;
  } else if(props.context === 'moreInfo') {
    return <span className={c.Genre__MoreInfo}>{props.genre}</span>;
  } else if(props.context === 'work') {
    return <span className={c.Genre__Work}>{props.genre}</span>;
  } else {
    return <span>{props.genre}</span>;
  }
};
 
export default genre;