import React from 'react';
import c from './SpinnerSecondary.module.scss';

const spinnerSecondary = (props) => {
  return (
    <div className={c.SpinnerSecondaryWrapper}>
      <div className={c.SpinnerSecondary}>
        <div className={[c.SpinnerSecondary_1, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_2, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_3, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_4, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_5, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_6, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_7, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_8, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_9, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_10, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_11, c.SpinnerSecondary__Child].join(' ')}></div>
        <div className={[c.SpinnerSecondary_12, c.SpinnerSecondary__Child].join(' ')}></div>
      </div>
    </div>
  );
}
 
export default spinnerSecondary;