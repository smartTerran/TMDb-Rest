import React from 'react';
import c from './AlsoKnownAs.module.scss';

const alsoKnownAs = (props) => {  
  let aka = (
    <div className={c.AlsoKnownAs}>
      <h2 className={c.AlsoKnownAs__Header}>Also Known As</h2>
      <ul className={c.AlsoKnownAs__List}>
        {props.aka.map(name => (
          <li key={name} className={c.AlsoKnownAs__Name}>
            {name}
          </li>))}
      </ul>
    </div>
  );

  return aka;
}
 
export default alsoKnownAs;