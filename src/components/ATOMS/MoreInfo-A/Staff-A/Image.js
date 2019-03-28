import React from 'react';
import { Link } from 'react-router-dom';
import NotAvailable from '../../../../assets/img/not-available.svg';
import Info from '../../../../assets/img/info.svg';
import c from './Image.module.scss';

const image = (props) => {
  let image = null;
  let src   = props.image ? props.image : NotAvailable;
  let wrapperClass = c.Image__Wrapper;
  
  if(props.isCountry || props.isProd) {
    wrapperClass = c.Image__WrapperCountry;
    let imgClass = c.Image__Country;

    image = <img className={imgClass} src={src} alt={`${props.name}`}/>;
  } else {
    let imgClass = props.image ? c.Image : c.Image__NA;
    image = (
      <Link
        to={'/people/' + props.personId} replace
        onClick={() => props.showPerson(props.personId)}> 
        <img className={c.Image__Info} src={Info} alt={`More Info`}/>
        <img className={imgClass} src={src} alt={`${props.name}`}/>
      </Link>
    );
  }

  return (
    <div className={wrapperClass}>
      {image}
    </div>
  );
};
 
export default image;