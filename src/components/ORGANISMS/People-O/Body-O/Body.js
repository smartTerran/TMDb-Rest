import React from 'react';

import Biography from '../../../MOLECULES/People-M/Biography-M/Biography';
import AlsoKnownAs from '../../../MOLECULES/People-M/AlsoKnownAs-M/AlsoKnownAs';
import Work from '../../../MOLECULES/People-M/Work-M/Work';

import * as u from '../../../../shared/Utility';
import c from './Body.module.scss';

const body = (props) => {

  const alsoKnownAs = u.isArrayGT(props.aka, 0) ? 
    <AlsoKnownAs aka={props.aka} /> : null;
  
  const work = u.isArrayGT(props.work, 0) ? 
    <Work work={props.work} filmClicked={props.filmClicked} /> : null;

  return ( 
    <div className={c.Body}>
      <Biography bio={props.bio} />
      {alsoKnownAs}
      {work}
    </div>
  );
}
 
export default body;