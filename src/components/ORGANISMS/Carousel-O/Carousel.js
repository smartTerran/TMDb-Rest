import React from 'react';

import CarouselArrow from '../../ATOMS/UI-A/ClickImage-A/ClickImage';
import CarouselInfo from '../../MOLECULES/Carousel-M/Info-M/Info';
import CarouselDots from '../../MOLECULES/Carousel-M/Dots-M/Dots';

import LeftArrow from '../../../assets/img/arrow-left-circle.svg';
import RightArrow from '../../../assets/img/arrow-right-circle.svg';
import c from './Carousel.module.scss';

const carousel = (props) => {      
  let carouselInfo = props.videos.map(video => {
    return (
      <CarouselInfo
        key={video.id}
        pathBase={props.pathBase + '/'}
        videoId={video.id}
        videoTitle={video.title || video.name}
        videoImage={video.backdrop_path} 
        videoGenre={video.genre}
        videoRating={video.vote_average}
        active={video.active}
        arrowClicked={props.arrowClicked}
        showVideo={props.videoClicked} />
    )
  });

  const classesLeftArrow  = [c.Carousel__Arrows, c.Carousel__Arrows_left].join(' ');
  const classesRightArrow = [c.Carousel__Arrows, c.Carousel__Arrows_right].join(' ');
  const slidePosition     = { transform: `translateX(${props.translateX}px)` };

  return ( 
    <header className={c.Carousel}>
      <CarouselArrow 
        className={classesLeftArrow}
        context='arrowRound'
        imgSrc={LeftArrow} 
        imgAlt='Left Arrow' 
        clickParam={'left'} 
        clicked={props.arrowClicked} />
      <CarouselArrow
        className={classesRightArrow}
        context='arrowRound'
        imgSrc={RightArrow} 
        imgAlt='Right Arrow' 
        clickParam={'right'} 
        clicked={props.arrowClicked} />
      <div 
        className={c.Carousel__Info} 
        ref={props.slideRef} 
        style={slidePosition}>
        {carouselInfo}
      </div>
      <CarouselDots 
        className={c.Carousel__Dots}
        videoList={props.videos}
        clicked={props.dotClicked} />
    </header>
  );
}
 
export default carousel;