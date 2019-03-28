import React from 'react';
import Name from '../../../ATOMS/Shared-A/Name-A/Name';
import ReviewContent from '../../../ATOMS/MoreInfo-A/Reviews-A/ReviewContent';
import c from './Reviews.module.scss';

const reviews = (props) => {
  return (  
      <div className={c.Reviews}>
        <Name 
          context='review' 
          name={props.author} />
        <ReviewContent 
          content={props.content}
          id={props.id}
          isExpanded={props.isExpanded}
          reviewClicked={props.reviewClicked} />
      </div>
  );
}
 
export default reviews;