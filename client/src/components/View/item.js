import React, { Component } from 'react';
import { ItemTypes } from '../View/constants.js';
import { DragSource } from 'react-dnd';
import{ selectComponent } from '../../actions/componentActions';
import{ showOptions } from '../../actions/codeActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropTarget from './dropTarget.js';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';



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
    component: store.component,
    itemCount: store.code.item,
    options: store.code.options
  };
})
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleSelect(){
    console.log('thiiiiiiiiisssssssss', this.props.item.props.className);
    this.props.dispatch(showOptions(!this.props.options)); 
    this.props.dispatch(selectComponent(this.props.item.props.className));
  }

  render() {
    console.log('OPTIONS SHOWING' + this.props.options)
    const { connectDragSource, isDragging, component } = this.props;
    if(!this.props.options){
    return connectDragSource(
      <div onClick={this.handleSelect.bind(this)}  style={{

        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
        {this.props.item}
      </div>
    )}
    else {
      return connectDragSource(
      <div onClick={this.handleSelect.bind(this)}  style={{

        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}>
        {this.props.item}
        <Drawer open={this.props.options}>
             <h3>Text of Component</h3>
           </Drawer>
      </div>);
         }
  }
}
Item.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.COMPONENT, componentSource, collect)(Item);