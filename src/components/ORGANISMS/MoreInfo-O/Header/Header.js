import React from 'react';

import Youtube from '../../../ATOMS/Shared-A/Youtube-A/Youtube';
import SideDrawerToggle from '../../../ATOMS/MoreInfo-A/SideDrawerToggle-A/SideDrawerToggle';
import VideoList from '../../../MOLECULES/MoreInfo-M/VideoList-M/VideoList';
import VideoSummary from '../../../MOLECULES/MoreInfo-M/VideoSummary-M/VideoSummary';
import c from './Header.module.scss';

const header = (props) => {
  const details = props.videoDetails;
  const sideDrawerClasses = props.sideDrawerExpanded ? 
    c.Header__SideDrawer :
    [c.Header__SideDrawer, c.Header__SideDrawer_shrink].join(' ');
  
  let times = null;
  if(props.type === 'movie') {
    times = [
      { name: 'Release Date', type: 'release', time: details.release_date },
      { name: 'Runtime', type: 'runtime', time: details.runtime }];    
  } else if(props.type === 'tv') {
    times = [
      { name: 'Last Air Date', type: 'release', time: details.last_air_date},
      { name: 'Episode Runtime', type: 'runtime', time: details.runtime || details.episode_run_time }];
  }    
  
  return ( 
    <header className={c.Header}>
      <Youtube 
        videoId={props.activeVideoId}
        playerId={String(details.id)}
        playerStateChanged={props.youtubeStateChanged} />
      <SideDrawerToggle
        className={c.Header__SideDrawerToggle}
        expanded={props.sideDrawerExpanded}
        expandToggle={props.sideDrawerToggle} />
      <div className={sideDrawerClasses}>
        <VideoSummary 
          type={props.type}
          details={details}
          videoTimes={times}
          expanded={props.overviewExpanded}
          expandToggle={props.overviewToggle}
          ratingMouseOver={props.ratingMouseOver}
          userRating={props.userRating}
          submitRating={props.submitRating}
          favoriteFilm={props.favoriteFilm}
          favorite={props.favorite} />
        <VideoList 
          videoList={details.videos} 
          videoImage={details.backdrop_path}
          videoClicked={props.videoClicked}
          activeId={props.activeVideoId}
          playerState={props.playerState} />
      </div>
    </header>
  );
}
 
export default header;