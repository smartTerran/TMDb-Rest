import React from 'react';
import { withRouter } from 'react-router-dom';

import Thumbnail from '../../FilmList-M/Thumbnail-M/Thumbnail';
import Overview from '../../../ATOMS/MoreInfo-A/Overview-A/Overview';
import Time from '../../../ATOMS/MoreInfo-A/Time-A/Time';
import Genre from '../../../ATOMS/Shared-A/Genre-A/Genre';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';
import Hearts from '../../../ATOMS/Shared-A/Hearts-A/Hearts';

import c from './Work.module.scss';

const work = (props) => {
  const allWork = props.work.map(film => {
    const filmType = film.media_type === 'movie' ? 'movie' : 'tv';
    
    return (
      <div className={c.Work} key={film.id}>
        <div className={c.Work__FilmImage}>
          <Thumbnail  
            pathBase={props.location.pathname + '/' + filmType + '/'}
            typePathBase={props.location.pathname + '/'}
            videoId={film.id}
            image={film.poster_path}
            showVideo={props.filmClicked} />
        </div>
        <div className={c.Work__Info}>
          <Subtitle context='work' subtitle={film.title} />
          <Hearts rating={film.vote_average} context='work' />
          <Time timeType='release' time={film.release_date} context='work' />
          <div className={c.Work__Genres}>
            {film.genre.map(genre => (
              <Genre 
                key={genre} 
                context='work' 
                genre={genre} />))}
          </div>
          <Overview overview={film.overview} context='work' />
        </div>
      </div>);
  });

  return (
    <div className={c.WorkWrapper}>
      <h2 className={c.Work__Header}>Known For</h2>
      {allWork}
    </div>
  );
}
 
export default withRouter(work);