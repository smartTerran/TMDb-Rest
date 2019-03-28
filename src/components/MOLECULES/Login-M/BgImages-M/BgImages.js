import React from 'react';
import * as u from '../../../../shared/Utility';
import c from './BgImages.module.scss';

const bgImages = (props) => {
  const { images } = props;
  const randImg = [];

  if(u.isArrayGT(images, 0)) {
    randImg.push(images[u.randomNumber(images.length)]);
    randImg.push(images[u.randomNumber(images.length)]);

    while(randImg[0] === randImg[1]) {
      randImg[1] = images[u.randomNumber(images.length)];
    }
  }

  return ( 
    <div className={c.BgImages}>
      <img 
        className={c.BgImages__First} 
        src={randImg[0]} 
        alt='Login Backdrop 1' />
      <img 
        className={c.BgImages__Second} 
        src={randImg[1]} 
        alt='Login Backdrop 2' />
    </div> 
  );
}
 
export default bgImages;