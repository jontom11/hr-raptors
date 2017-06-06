
import React, { Component } from 'react';
import Item from './item';

let Items = (props) => {
  let itemCollection = [];
  
  props.items.forEach((component) => {
      itemCollection.push(<Item item={component} />);
  });

  return (
    <div >
        {itemCollection}
    </div>
  );
};

export default Items;