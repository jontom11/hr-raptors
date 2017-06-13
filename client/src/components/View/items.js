
import React, { Component } from 'react';
import Item from './item';

let Items = (props) => {
  let itemCollection = [];

  props.items.forEach((component, index) => {
    itemCollection.push(<Item item={component} id={component} key={index} toggleoptionview={props.toggleoptionview} />);
  });

  return (
    <div >
        {itemCollection}
    </div>
  );
};

export default Items;
