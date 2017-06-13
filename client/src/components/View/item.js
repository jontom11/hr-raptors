
import React, { Component } from 'react';
import { ItemTypes } from '../View/constants.js';
import { DragSource } from 'react-dnd';
import{ selectComponent } from '../../actions/componentActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const collect = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

const componentSource = {
  beginDrag(props) {
    console.log(props);
    return {component:props.item};
  }
};

@connect((store) => {
  return {
    componentValue: store.component.component
  };
})
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { connectDragSource, isDragging, component } = this.props;
    return connectDragSource(
      <div onClick={(event) => {this.props.toggleoptionview(this); this.props.dispatch(selectComponent(this))}}  style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
        {this.props.item}
      </div>
    );
  }
}
Item.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.COMPONENT, componentSource, collect)(Item);