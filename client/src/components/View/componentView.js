import React from 'react';
import { DropTarget } from 'react-dnd';

class ComponentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
        <div style={{width: '100px', height: '100px',backgroundColor:'red'}}>
        </div>
    );
}
}
export default ComponentView;
