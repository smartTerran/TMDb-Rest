import React from 'react';
import c from './ReviewContent.module.scss';

const reviewContent = (props) => {
  let reviewText = props.content;
  let classNames = [c.ReviewContent];

  if(props.content.length > 250) {
    reviewText = [props.content.slice(0, 301), '...'].join('');
    classNames = [c.ReviewContent, c.ReviewContent__Minified];
  }

  if(props.isExpanded.hasOwnProperty(props.id) && props.isExpanded[props.id]) {
    reviewText = props.content;
    classNames = [c.ReviewContent];
  }

  return (
    <p 
      className={classNames.join(' ')}
      onClick={() => props.reviewClicked(props.id)}>
      {reviewText}
    </p>
  );
}
 
export default reviewContent;