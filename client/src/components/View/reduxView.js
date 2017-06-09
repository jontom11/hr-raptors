import React from 'react';
import { connect } from 'react-redux';
import { updateTree } from '../../actions/codeActions';
import dragItems from '../dragItems';
import Tree from '../../dataStructure/tree';
import _ from 'lodash';
import DropTarget from './dropTarget';
import shortid from 'shortid';
import Items from './items'

const styles = {
  bottomUp: {
    margin: '-2% 0',
  },
};

@connect((store) => {
  return {
    components: store.code.components,
    componentsLinkedList: store.code.componentsLinkedList,
    tree: store.code.tree,
    item: store.code.item,
    head: store.code.head,
    tail: store.code.tail,
  };
})
class reduxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      dropTarget: (
        <div className="col s12" id={shortid.generate()}>
          <DropTarget handleDrop={this.handleDroppedComponent.bind(this)} context={this} />
        </div>)
    };
    this.handleDroppedComponent = this.handleDroppedComponent.bind(this);
  }

  handleDroppedComponent(droppedInItem, ID) {
    this.props.handleChange(droppedInItem, ID);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.componentState.componentID !== this.props.componentState.componentID) {
      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[nextProps.componentState.componentName]
        );
        this.props.dispatch(updateTree(tree));
      } else if (nextProps.componentState.ID === 'head') {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[nextProps.componentState.componentName]
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree.add(
          dragItems[nextProps.componentState.componentName],
          nextProps.componentState.ID,
          tree.traverseBF
        );
        this.props.dispatch(updateTree(tree));
      }
    }

  }

  render() {
    const { tree } = this.props;

    var treeArray = [];

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = tree.traverseRendering();
    }

    _.forEach(treeObject, (node) => {
      treeArray.push([node.component, node.dropComponent, node.ID]);
    });

    const treeMap = _.map(treeArray, (code, index) => (
      <div key={index}>
        <div>{code[0]}</div>
        <div className="col s12" id={code[2]}>
          <DropTarget handleDrop={this.handleDroppedComponent.bind(this)} id={code[2]} />
        </div>
      </div>));

    return (
      <div style={styles.bottomUp}>
        <Items items={treeMap} toggleOptionView={this.props.toggleOptionView}/>
      </div>
    );
  }
}

export default reduxView;
