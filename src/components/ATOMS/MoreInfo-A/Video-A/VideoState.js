import React from 'react';
import Play from '../../../../assets/img/play-button.svg';
import Pause from '../../../../assets/img/pause-button.svg';
import c from './VideoState.module.scss';

const videoState = (props) => {
  const classNames = props.className ? 
    [c.VideoState, props.className].join(' ') : c.VideoState;
  const [playState, playTitle] = props.playerState === 1 ? 
    [Pause, 'Paused'] : [Play, 'Playing'];
    
  return <img className={classNames} src={playState} alt={playTitle}/>; 
}
 
export default videoState;