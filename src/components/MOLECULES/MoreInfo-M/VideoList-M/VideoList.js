import React from 'react';
import VideoType from '../../../ATOMS/MoreInfo-A/Video-A/VideoType';
import FilmImage from '../../../ATOMS/Shared-A/FilmImage-A/FilmImage';
import VideoState from '../../../ATOMS/MoreInfo-A/Video-A/VideoState';
import c from './VideoList.module.scss';

const videoList = (props) => {
  const classNames = props.className ? 
    [c.VideoList, props.className].join(' ') : c.VideoList;
    
  const types = {};
  const videos = props.videoList.map(video => {
    !!types[video.type] ? types[video.type]++ : types[video.type] = 1;
    
    let classes = c.VideoList__Item;
    let videoState = null;
    if(props.activeId === video.key) {
      classes = [c.VideoList__Item, c.VideoList__Item_active].join(' ');
      videoState = (
        <VideoState
          className={c.VideoList__State}
          playerState={props.playerState} />
      );
    }

    return (
      <div 
        key={video.id} 
        className={classes}
        onClick={() => props.videoClicked(video.key)}>
        <span className={c.VideoList__Img}>
          <span className={c.VideoList__Overlay}>
            <FilmImage 
              context='thumbnail'
              imgSrc={props.videoImage} 
              imgAlt={video.name}/>
          </span>
          {videoState}
        </span>
        <VideoType 
          videoType={`${video.type} ${types[video.type]}`}
          className={c.VideoList__Type} />
      </div>
    )
  });
  
  return ( 
    <div className={classNames}>
      {videos}
    </div>
  );
}
 
export default videoList;