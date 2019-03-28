import React from 'react';
import { withRouter } from 'react-router-dom';
import FilmList from '../../../components/ORGANISMS/FilmList-O/FilmList';
import SpinnerSecondary from '../../../components/ATOMS/UI-A/SpinnerSecondary-A/SpinnerSecondary';
import Arrow from '../../../components/ATOMS/UI-A/ClickImage-A/ClickImage';
import PageCount from '../../../components/ATOMS/UI-A/PageCount-A/PageCount';

import LeftArrow from '../../../assets/img/arrow-left-circle.svg';
import RightArrow from '../../../assets/img/arrow-right-circle.svg';
import c from './DiscoverBody.module.scss';
import * as u from '../../../shared/Utility';

const discover = (props) => {
  const classesLeftArr  = [c.DiscoverBody__Arrows, c.DiscoverBody__Arrows_left].join(' ');
  const classesRightArr = [c.DiscoverBody__Arrows, c.DiscoverBody__Arrows_right].join(' ');
  let classesResults    = [c.DiscoverBody__List, c.DiscoverBody__List_hide].join(' ');

  const sliceStart  = (props.page-1) * props.listLength,
        sliceEnd    = props.page * props.listLength;

  let results         = null,
      leftArrow       = null,
      isNextPageAvail = true,
      loadingSpinner  = <SpinnerSecondary />;
  
  if(props.page > 1) {
    leftArrow = (
      <Arrow
        className={classesLeftArr}
        context='arrowRound'
        imgSrc={LeftArrow}
        imgAlt='Left Arrow'
        args={['left', props.category]}
        clicked={props.arrowClicked} />);
  }
  
  let rightArrow = (
    <Arrow
      className={classesRightArr}
      context='arrowRound'
      imgSrc={RightArrow}
      imgAlt='Right Arrow'
      args={['right', props.category]}
      clicked={props.arrowClicked} />
  );
  
  if(u.isArrayGT(props.results, 0)) {
    const filmList = props.results.slice(sliceStart, sliceEnd);
    isNextPageAvail = filmList.length >= props.listLength;

    if(!isNextPageAvail && props.isImgLoaded) {
      rightArrow = null;
    }
    
    let pathBase = props.location.pathname;
    if(props.pathBase) {
      pathBase = props.pathBase;
    }

    results = (
      <FilmList
        filmList={filmList}
        videoClicked={props.videoClicked}
        pathBase={pathBase}
        mediaType={props.mediaType}
        isDiscover={!!props.isDiscover}
        isSearch={!!props.isSearch}
        hasPathPrefix={!!props.hasPathPrefix} />
    );      
    
  }
  
  if(props.isImgLoaded) {
    classesResults = c.DiscoverBody__List;
    loadingSpinner = null;
  }
  
  return (
    <section className={c.DiscoverBody}> 
      {loadingSpinner}
      <div className={classesResults}>
        {results}    
      </div>
      {leftArrow}
      {rightArrow}
      <PageCount 
        context={props.context} 
        page={props.page} 
        hasNextPage={isNextPageAvail} />     
    </section>
  );
}
 
export default withRouter(discover);