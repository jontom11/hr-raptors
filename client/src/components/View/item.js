import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import{ deleteComponent, selectComponent } from '../../actions/componentActions';
import{ notShowingOptions, updateTree, showOptions } from '../../actions/codeActions';
import DropTarget from './dropTarget.js';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
import Tree from '../../dataStructure/tree';
import $ from 'jquery';
import { ItemTypes } from '../View/constants.js';


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
    components: store.code.components,
    componentsLinkedList: store.code.componentsLinkedList,
    tree: store.code.tree,
    options: store.code.options
    itemCount: store.code.item,
    tree: store.code.tree,
  };
})
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elEditText: '',
      isEntered: true,
      savedComponent: null,
    };
  }

  changeElementContent(component, value) {
    var type = component.type;
    if (type === 'h1') {
      return <h1>{value}</h1>;
    }
  }

  handleInputChange(event) {
    console.log(event.target.value);
    if (event.key === 'Enter') {
      console.log('SUBMIT HIT', event.target.value);
      console.log('saaaaaved cooooomponent', this.state.savedComponent);
      var result = this.changeElementContent(this.state.savedComponent, event.target.value);
      console.log(result);


      this.props.tree.replaceComponent(this.props.item.props.className, this.props.tree.traverseDF, result);
      // update tree
      console.log('uppddateed treee', this.props.tree);
      this.props.dispatch(updateTree(this.props.tree));

      this.setState({
        elEditText: event.target.value,
        isEntered: true,
      })
    }
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
    var typeToFind = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
    var isEditable = this.props.tree.findType(this.props.item.props.className, this.props.tree.traverseDF, typeToFind);

    if (isEditable && this.state.isEntered) {
      // Replace component with text input
      var savedComponent = this.props.tree.replaceComponent(
        this.props.item.props.className,
        this.props.tree.traverseDF,
        <input onKeyPress={this.handleInputChange.bind(this)} type="text" />
      );
      // update tree
      this.props.dispatch(updateTree(this.props.tree));

      this.setState({
        savedComponent: savedComponent,
        isEntered: false,
      });

      console.log('savedComponent', savedComponent);
      console.log('new updated tree', this.props.tree);
    }
    this.props.dispatch(showOptions());
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
