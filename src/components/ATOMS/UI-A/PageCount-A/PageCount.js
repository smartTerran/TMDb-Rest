import React from 'react';
import c from './PageCount.module.scss';

const pageCount = (props) => {
  let leftCount = null;
  let rightCount = null;
  let classNames = [c.PageCount]
  
  if(props.context === 'discover') {
    classNames.push(c.PageCount_Discover);
  } else if(props.context === 'main') {
    classNames.push(c.PageCount_Main);
  }

  if(+props.page > 1) {
    leftCount = <span className={c.PageCount__Side}>{+props.page - 1}</span>
  } else {
    leftCount = <span className={c.PageCount__Side}>-</span>    
  }
  if(props.hasNextPage) {
    rightCount = <span className={c.PageCount__Side}>{+props.page + 1}</span>
  } else {
    rightCount = <span className={c.PageCount__Side}>-</span>
  }

  return (
    <div className={classNames.join(' ')}>
      {leftCount}
      <span className={c.PageCount__Mid}>{props.page}</span>
      {rightCount}
    </div>
  );
}
 
export default pageCount;