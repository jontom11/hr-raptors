import React from 'react';
import { connect } from 'react-redux';
import { addToTail, addToHead, updateTree } from '../../actions/codeActions';
import dragItems from '../dragItems';
import linkers from '../../dataStructure/linkedList';
import Tree from '../../dataStructure/tree';
import _ from 'lodash';
import DropTarget from './dropTarget';
import shortid from 'shortid';

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
    console.log('neeeexxxtttprrooopps', nextProps.componentState.ID);
    if (nextProps.componentState.componentID !== this.props.componentState.componentID) {
      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[nextProps.componentState.componentName],
          this.state.dropTarget
        );
        this.props.dispatch(updateTree(tree));
      } else if (nextProps.componentState.ID === 'head') {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[nextProps.componentState.componentName],
          this.state.dropTarget,
          tree
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree.add(
          dragItems[nextProps.componentState.componentName],
          this.state.dropTarget,
          nextProps.componentState.ID,
          tree.traverseBF
        );
        this.props.dispatch(updateTree(tree));
      }


      /* ADDING TO LINKED LIST */
      if (nextProps.componentState.dropTop) {
        this.props.dispatch(addToHead(
          linkers.addToHead(
            this.props.componentsLinkedList,
            dragItems[nextProps.componentState.componentName],
            nextProps.componentState.isDropped,
            this.props.item,
            this.props.head,
            this.props.tail,
          )
        ));
      } else {
        this.props.dispatch(addToTail(
          linkers.addToTail(
            this.props.componentsLinkedList,
            dragItems[nextProps.componentState.componentName],
            nextProps.componentState.isDropped,
            this.props.item,
            this.props.head,
            this.props.tail,
          )
        ));
      }
    }
  }

  render() {
    const { components, componentsLinkedList, head, tree } = this.props;

    var treeArray = [];

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = tree.traverseBFF(function (node) {
        treeArray.push([node.component, node.dropComponent, node.ID]);
      });
    }

    _.forEach(treeObject, (node) => {
      treeArray.push([node.component, node.dropComponent, node.ID]);
    });

      console.log(treeArray);
    const treeMap = _.map(treeArray, (code, index) => (
      <div key={index}>
        <div>{code[0]}</div>
        <div className="col s12" id={code[2]}>
          <DropTarget handleDrop={this.handleDroppedComponent.bind(this)} id={code[2]} />
        </div>
      </div>));

    return (
      <div style={styles.bottomUp}>
        <div>{treeMap}</div>
      </div>
    );
  }
}

export default reduxView;
