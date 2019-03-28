import React from 'react';

import bookmark from '../../../../assets/img/bookmark.svg';
import fullHeart from '../../../../assets/img/full-heart.svg';
import c from './Highlights.module.scss';

const highlights = (props) => {
  let img = null;
  let name = props.highlightName;
  let countClasses = [c.Highlights__Count];
  let count = 0;
  
  if(props.type === 'rated') {
    img = fullHeart;
  } else if(props.type === 'favorite') {
    img = bookmark;
    countClasses.push(c.Highlights__Count_favorite);
  }

  if(props.count && props.count > 0) {
    count = props.count;
  }  

  if(count === 1) {
    name = name.substring(0, name.length - 1);
  }
  
  return ( 
    <div className={c.Highlights}>
      <div className={c.Highlights__ImageWrapper}>
        <img className={c.Highlights__Image} src={img} alt={props.highlightName}/>
        <span className={countClasses.join(' ')}>{count}</span>
      </div>
      <span className={c.Highlights__Name}>{name}</span>
    </div>
  );
}
 
export default highlights;