import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

import Tree from '../../dataStructure/tree';
import MaterialTitlePanel from './navTitlePanel';
import components from '../../dragItems';
import SingleComponent from './component';
import{ deleteComponent } from '../../actions/componentActions';
import { connect } from 'react-redux';
import{ notShowingOptions } from '../../actions/codeActions';



const styles = {
  OptionBar: {
    maxHeight: '100%',
  },
  OptionBarLink: {
    display: 'block',
    padding: '1vh 0px',
    color: '#000',
    textDecoration: 'none',
    lineHeight: 'inherit',

  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: '2.5vh',
    height: '100%',
    backgroundColor: 'white',
  },
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
class OptionbarContent extends React.Component{
constructor(props){
  super(props);
this.state={};
}
  
handleRemove() {
  const uniqueID = this.props.component.component;
  if (Object.keys(this.props.tree).length > 0) {
    var treeObject = this.props.tree.traverseRendering();
  }
  var component;
  var result = this.props.tree.contains(function(currentNode){
    if (uniqueID === currentNode.ID) {
      component = currentNode.component;
      return currentNode.component;
    }
  }, this.props.tree.traverseDF);
  this.props.tree.remove(
    component,
    this.props.component.component,
    this.props.tree.traverseBF
  ); 
  this.props.dispatch(notShowingOptions())
}  
  
render(){
  
  const style = this.props.style ? Object.assign({}, styles.OptionBar, props.style) : styles.OptionBar;
  
  return (
    <div>
      <MaterialTitlePanel title="Options" style={style} />
      <button type='button'onClick={this.handleRemove.bind(this)}>Delete me</button>
      <div style={styles.content}>
        <h3 href="#" style={styles.OptionBarLink}></h3>
      </div>
    </div>
    );
  }
}
OptionbarContent.propTypes = {
  style: PropTypes.object,
};

export default OptionbarContent;