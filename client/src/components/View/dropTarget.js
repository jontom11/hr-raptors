import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';
import { updateTreeNew } from '../../actions/codeActions';

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.handleDrop(item.component, props.toID, props.rowObject);
    // props.dispatch(updateTreeNew(item.component, props.toID, props.oldTree));
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
  renderOverlay(color, height) {
    return (
      <div>
       <div style={{
         margin: '2%',
         height: '20px',
         width: '100%',
         borderRadius: '5px',
         backgroundColor: color,
         border: '2px dotted #87CEFA',
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
