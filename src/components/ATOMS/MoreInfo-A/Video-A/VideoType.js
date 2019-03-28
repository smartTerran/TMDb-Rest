import React from 'react';
import c from './VideoType.module.scss';

const videoType = (props) => {
  const classNames = props.className ? 
    [c.VideoType, props.className].join(' ') : c.VideoType;

  return (
    <h4 className={classNames}>{props.videoType}</h4>
  )
}
 
export default videoType;