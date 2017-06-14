import React, { Component } from 'react';
import { ItemTypes } from '../View/constants.js';
import { DragSource } from 'react-dnd';
import{ selectComponent } from '../../actions/componentActions';
import{ showOptions } from '../../actions/codeActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import{ deleteComponent } from '../../actions/componentActions';
import{ notShowingOptions } from '../../actions/codeActions';
import DropTarget from './dropTarget.js';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import Tree from '../../dataStructure/tree';






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
    component:store.component,
    components: store.code.components,
    componentsLinkedList: store.code.componentsLinkedList,
    tree: store.code.tree,
    options: store.code.options
  };
})
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
handleRemove() {
  const uniqueID = this.props.component.component;
  if (Object.keys(this.props.tree).length > 0) {
    var treeObject = this.props.tree.traverseRendering();
  }
  var component;
  var result = this.props.tree.contains(function(currentNode){
    if (uniqueID === currentNode.ID) {
      console.log('I FOUND THE ID YAAAAAY', currentNode.component)
      component = currentNode.component;
      return currentNode.component;
    }
  }, this.props.tree.traverseDF);
  console.log('result', component);
  console.log('I AM HEREEEEEE', uniqueID);
  this.props.tree.remove(
    component,
    this.props.component.component,
    this.props.tree.traverseBF
  ); 
  this.props.dispatch(notShowingOptions())
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
              <button type='button' id='deleteButton'onClick={this.handleRemove.bind(this)}>Delete me</button>
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