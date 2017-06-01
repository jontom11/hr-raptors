import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    console.log(item);
    return item;
  }
};
let collect = function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};
class ComponentView extends React.Component {
  renderOverlay(color) {
    return (
       <div style={{
         height: '400px',
         width: '400px',
         backgroundColor: color,
       }} />
    );
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
<div>
    {isOver && this.renderOverlay('red')}
    {!isOver && this.renderOverlay('blue')}
    </div>
    );
  }
}
export default DropTarget(ItemTypes.COMPONENT, squareTarget, collect)(ComponentView);
