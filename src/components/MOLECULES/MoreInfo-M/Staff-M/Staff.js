import React from 'react';

import Image from '../../../ATOMS/MoreInfo-A/Staff-A/Image';
import Name from '../../../ATOMS/Shared-A/Name-A/Name';
import Description from '../../../ATOMS/MoreInfo-A/Staff-A/Description';

import c from './Staff.module.scss';

const staff = (props) => {
  const character = props.character ? 
    <Description
      descType='character'
      desc={props.character} /> : null;

  const job = props.job ? 
    <Description
        descType='job'
        desc={props.job} /> : null;
    
  const department = props.department ? 
    <Description
        descType='department'
        desc={props.department} /> : null;
  
  const country = props.country ? 
    <Description
      descType='country'
      desc={props.country} /> : null;

  return (  
    <figure className={c.Staff}>
      <Name 
        context='staff' 
        name={props.name} />
      <Image 
        isProd={props.isProd}
        image={props.profile_path}
        isCountry={!!props.country}
        showPerson={props.showPerson}
        personId={props.id} />
      <figcaption>
        {character}
        {job}
        {department}
        {country}
      </figcaption>
    </figure>
  );
}
 
export default staff;