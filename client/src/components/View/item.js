import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';

import{ selectComponent } from '../../actions/componentActions';
import{ showOptions, updateTree } from '../../actions/codeActions';
import { ItemTypes } from '../View/constants.js';
import{ notShowingOptions } from '../../actions/codeActions';


const styles = {
  drawer: {
    padding: '3.5vh',
  },
  button: {
    marginRight: 20,
  },
};

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
    toggleOptions: store.code.toggleOptions,
  };
})
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      componentName: null,
    };
  }

  handleRemove() {
    var component;
    this.props.tree.remove(
      component,
      this.props.component.component,
      this.props.tree.traverseBF
    );
    this.props.dispatch(showOptions(!this.props.toggleOptions));
    this.props.dispatch(updateTree(this.props.tree));

    // this.props.dispatch(notShowingOptions())
  }

  handleOptionsToggle() {
    this.props.dispatch(showOptions(!this.props.toggleOptions));
  }

  handleSelectComponent() {
    var component;
    var componentName;
    var className = this.props.item.props.className;
    console.log('===========================', className);
    this.props.tree.traverseDF(function(node){
      if (node.ID === className) {
        component = node.component;
        componentName = node.componentName;
      }
    });
    console.log('component.props.type', component.props.children);
    console.log('component.props.type', component);
    this.setState({
      componentName: componentName,
    });
    this.props.dispatch(selectComponent(this.props.item.props.className));
  }

  render() {

    const { connectDragSource, isDragging, toggleOptions } = this.props;

      return connectDragSource(
        <div>
          <div
            onClick={this.handleSelectComponent.bind(this)}
            onTouchTap={this.handleOptionsToggle.bind(this)}
            style={{
              opacity: isDragging ? 0.5 : 1,
              cursor: 'move',
            }}
          >
            {this.props.item}
          </div>
          <Drawer
            id="DRAWER"
            open={toggleOptions}
            containerStyle={styles.drawer}
          >
            <FloatingActionButton
              style={styles.button}
              onClick={this.handleOptionsToggle.bind(this)}
              mini={true}
            >
              <ContentDelete />
            </FloatingActionButton>
            <h5>Edit: {this.state.componentName}</h5>
            <RaisedButton
              type="button"
              id="deleteButton"
              label="Delete Me"
              onClick={this.handleRemove.bind(this)}
            />
          </Drawer>
        </div>);

  }
}
Item.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.COMPONENT, componentSource, collect)(Item);
