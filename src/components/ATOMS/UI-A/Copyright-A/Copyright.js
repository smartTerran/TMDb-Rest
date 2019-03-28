import React from 'react';
import c from './Copyright.module.scss';

const copyright = () => {
  return ( 
    <div className={c.Copyright}>
      <p className={c.Copyright__Time}>Copyright &copy; {new Date().getFullYear()} Film Base </p> 
      <p className={c.Copyright__Credit}>Designed and developed by Mike Choi</p>
    </div>
  );
}
 
export default copyright;