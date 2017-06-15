import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';

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
      input: null,
      inputText: null,
      uniqueID: null,
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

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    });
    console.log(event.target.value);
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      var uniqueID = this.state.uniqueID;
      var inputText = this.state.inputText;
      var changeComponent;

      if (this.state.componentName === 'h1') {
        changeComponent = <h1>{inputText}</h1>;
      } else if (this.state.componentName === 'h2') {
        changeComponent = <h2>{inputText}</h2>;
      } else if (this.state.componentName === 'h3') {
        changeComponent = <h3>{inputText}</h3>;
      } else if (this.state.componentName === 'h4') {
        changeComponent = <h4>{inputText}</h4>;
      } else if (this.state.componentName === 'h5') {
        changeComponent = <h5>{inputText}</h5>;
      } else if (this.state.componentName === 'h6') {
        changeComponent = <h6>{inputText}</h6>;
      } else if (this.state.componentName === 'strong') {
        changeComponent = <strong>{inputText}</strong>;
      } else if (this.state.componentName === 'emphasis') {
        changeComponent = <emphasis>{inputText}</emphasis>;
      } else if (this.state.componentName === 'bold') {
        changeComponent = <bold>{inputText}</bold>;
      } else if (this.state.componentName === 'paragraph') {
        changeComponent = <p>{inputText}</p>;
      } else if (this.state.componentName === 'blockquote') {
        changeComponent = <blockquote>{inputText}</blockquote>;
      }

      this.props.tree.updateComponent(uniqueID, this.props.tree.traverseDF, changeComponent);
      this.props.dispatch(updateTree(this.props.tree));
      this.props.dispatch(showOptions(!this.props.toggleOptions));
    }
  }

  handleSelectComponent() {
    var component;
    var componentName;
    // className is Unique ID for node selected
    var className = this.props.item.props.className;
    console.log('===========================', className);
    this.props.tree.traverseDF(function(node){
      if (node.ID === className) {
        component = node.component;
        componentName = node.componentName;
      }
    });
    console.log('component.props.type', component.props.children);

    this.setState({
      componentName: componentName,
      uniqueID: className,
    });

    var editableTextEl = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'emphasis', 'bold', 'paragraph', 'blockquote'];
    if (_.includes(editableTextEl, componentName)) {
      // add input field
      this.setState({
        input: <TextField hintText="Edit Text" onChange={this.handleInputChange.bind(this)} onKeyPress={this.handleEnter.bind(this)} />,
      });
    }

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
            <div>{this.state.input}</div>
          </Drawer>
        </div>);

  }
}
Item.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.COMPONENT, componentSource, collect)(Item);
