import React from 'react';
import Thumbnail from '../../MOLECULES/FilmList-M/Thumbnail-M/Thumbnail';
import c from './FilmList.module.scss';

const filmList = (props) => {
  let listThumbnails  = null;
  let classNames      = c.FilmList;
  
  if(props.filmList) {
    listThumbnails = props.filmList.map(film => {
      let pathBase = props.pathBase + '/';
      if(props.isSearch) {
        pathBase = props.pathBase + '/' + film.media_type + '/';
      } else if(props.isDiscover) {
        pathBase = props.pathBase + '/' + props.mediaType +'/';
      }

      let typePathBase = '';
      if(props.hasPathPrefix) {
        typePathBase = props.pathBase + '/';
      }
      
      return (
        <Thumbnail
          key={film.id}
          videoId={film.id}
          image={film.poster_path}
          title={film.title || film.name}
          rating={film.vote_average}
          showVideo={props.videoClicked}
          pathBase={pathBase}
          typePathBase={typePathBase} />
      )
    })
  }

  const shownList = (
    <section className={classNames}>
      <div className={c.FilmList__List}>
        {listThumbnails}
      </div>
    </section>
  );
  
  return shownList;
}
 
export default filmList;