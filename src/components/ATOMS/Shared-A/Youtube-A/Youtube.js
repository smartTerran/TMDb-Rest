import React, { PureComponent } from 'react';
import c from './Youtube.module.scss';

class Youtube extends PureComponent {
  YT = {...window.YT};
  player = null;
  videoId = this.props.videoId;

  componentDidMount() {
    this.onYouTubeIframeAPIReady();
  }
  
  // Creates an <iframe> (and YouTube player) after the API code downloads.
  onYouTubeIframeAPIReady = () => {
    if(!!this.YT && this.YT.Player && !this.player) {
      const newPlayer = new this.YT.Player(this.props.playerId, {
        videoId: this.props.videoId,
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
      this.player = newPlayer;
    }
  }
  
  // The API will call this function when the video player is ready.
  onPlayerReady = (event) => {
    event.target.pauseVideo();
    this.props.playerStateChanged(this.player.getPlayerState());
  }  
  
  onPlayerStateChange = (event) => {
    this.props.playerStateChanged(this.player.getPlayerState());
  }
  
  render() {
    if(this.props.videoId !== this.videoId) {
      this.player.loadVideoById({videoId: this.props.videoId});
      this.videoId = this.props.videoId;
    }

    return ( 
      <div className={c.Youtube} id={this.props.playerId}></div>
     );
  }
}
 
export default Youtube;