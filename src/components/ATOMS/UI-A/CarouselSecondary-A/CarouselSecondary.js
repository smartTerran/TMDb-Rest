import React from 'react';
import Slider from 'react-slick';
import Arrow from '../ClickImage-A/ClickImage';
import leftArrowImg from '../../../../assets/img/arrow-left-circle.svg';
import rightArrowImg from '../../../../assets/img/arrow-right-circle.svg';
import './CarouselSecondary.scss';

const carouselSecondary = (props) => {
  let { slidesToShow, slidesToScroll, list } = props;
  const listLength = list.length;

  let rightArrow = {
    context: 'arrowRound',
    imgSrc: rightArrowImg,
    imgAlt: 'Right Arrow'
  }

  let leftArrow = {
    context: 'arrowRound',
    imgSrc: leftArrowImg,
    imgAlt: 'Left Arrow'
  };

  if(listLength < slidesToShow) {
    slidesToShow = listLength;
  }
  
  let settings = {
    slidesToScroll: slidesToScroll,
    slidesToShow: slidesToShow,
    infinite: true,
    dots: true,    
    speed: 300,
    draggable: false,
    nextArrow: <Arrow {...rightArrow} />,
    prevArrow: <Arrow {...leftArrow} />,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: listLength >= 4 ? 4 : listLength
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: listLength >= 3 ? 3 : listLength
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: listLength >= 2 ? 2 : listLength
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: listLength >= 1 ? 1 : listLength
        }
      }
    ]
  }

  if(listLength > 0) {
    return <Slider {...settings}>{list}</Slider>;
  }

  return null;
}
 
export default carouselSecondary;