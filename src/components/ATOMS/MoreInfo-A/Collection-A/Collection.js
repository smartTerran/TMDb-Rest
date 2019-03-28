import React from 'react';

const collection = (props) => {
  const collection = props.collection ? 
    <dd>{props.collection}</dd> : null;

  return collection;
}
 
export default collection;