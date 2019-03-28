import React from 'react';
import Staff from '../../../MOLECULES/MoreInfo-M/Staff-M/Staff';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';
import Reviews from '../../../MOLECULES/MoreInfo-M/Reviews-M/Reviews';
import Money from '../../../MOLECULES/MoreInfo-M/Money-M/Money';
import CarouselSecondary from '../../../ATOMS/UI-A/CarouselSecondary-A/CarouselSecondary';
import c from './Body.module.scss';
import * as u from '../../../../shared/Utility';

const body = (props) => {
  let notAvail = <p className={c.Body__NotAvailable}>Not Available</p>;
  let reviews  = notAvail;

  const carousels = [
    {content: notAvail, name: 'Cast'}, 
    {content: notAvail, name: 'Crew'},
    {content: notAvail, name: 'Production'}
  ];

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1
  };

  if(u.isArrayGT(props.staffListCast, 0)) {
    let staffCast = props.staffListCast.map(cast => {
      return (<Staff 
          key={cast.id} 
          {...cast}
          showPerson={props.personClicked} />);
    });
    
    carousels[0].content = <CarouselSecondary {...settings} list={staffCast} />;
  } 
  
  if(u.isArrayGT(props.staffListCrew, 0)) {
    let staffCrew = props.staffListCrew.map(crew => {
      return (<Staff 
        key={crew.credit_id} 
        {...crew} 
        showPerson={props.personClicked} />);
    });

    carousels[1].content = <CarouselSecondary {...settings} list={staffCrew} />;
  } 

  if(u.isArrayGT(props.productionList, 0)) {
    let production = props.productionList.map(production => {
      return (<Staff key={production.id} name={production.name} isProd country={production.origin_country} image={production.logo_path} />);
    });

    carousels[2].content = <CarouselSecondary {...settings} list={production} />;
  } 
    
  if(props.reviewList.length > 0) {
    reviews = props.reviewList.map(review => {
      return (<Reviews key={review.id} {...review} isExpanded={props.isReviewExpanded} reviewClicked={props.reviewClicked} />);
    });
  }

  const money = [];
  for(let key in props.money) {
    money.push(<Money key={key} {...props.money[key]} />);
  }

  const staffLists = carousels.map(carousel => {
    return (
      <div key={carousel.name} className={c.Body__Staff}>
        <Subtitle context='moreInfo' subtitle={carousel.name} />
        {carousel.content}
      </div>
    );
  })
  
  return (
    <section className={c.Body}>
      <div className={c.Body__Money}>{money}</div>      
      {staffLists}
      <div className={c.Body__Reviews}>
        <Subtitle context='moreInfo' subtitle='Reviews' />
        {reviews}
      </div>
    </section>
  );
}
 
export default body;