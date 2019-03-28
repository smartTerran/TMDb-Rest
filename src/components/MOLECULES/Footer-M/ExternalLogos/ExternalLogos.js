import React from 'react';
import ExternalLogo from '../../../ATOMS/UI-A/ExternalLogo-A/ExternalLogo';

const externalLogos = (props) => {
  const externalLogos = props.links.map(link => {
    return (
      <ExternalLogo
        key={link.name}
        type={link.type}
        imgSrc={link.img}
        imgAlt={`${link.name} Logo`}
        url={link.url} />
    );
  })
  return externalLogos;
}
 
export default externalLogos;