import React from 'react';
import Dot from '../../../ATOMS/Carousel-A/Dot-A/Dot';

const dots = (props) => {
  let dots = null;
  
  if(props.videoList) {
    dots = (
      <div className={props.className}>
        {props.videoList.map(video => {
          return video.active ? 
            <Dot key={video.id} id={video.id} active /> : 
            <Dot clicked={props.clicked} key={video.id} id={video.id} />;
        })}
      </div>
    )
  }

  return dots;
}
 
export default dots;