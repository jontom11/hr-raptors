import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.added(item.component);
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
      <div>
       <div style={{
         marginTop: '27px',
         height: '25px',
         width: '100%',
         borderRadius: '5px',
         backgroundColor: color,
         text: "DROP HERE",
       }} />
       </div>
    );
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>
        {isOver && this.renderOverlay('#87CEFA')}
        {!isOver && this.renderOverlay('none')}
      </div>
    );
  }
}
export default DropTarget(ItemTypes.COMPONENT, squareTarget, collect)(ComponentView, squareTarget);
