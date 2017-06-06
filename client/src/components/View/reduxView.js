import React from 'react';
import { connect } from 'react-redux';
import { addToTail, addToHead, updateTree } from '../../actions/codeActions';
import dragItems from '../dragItems';
import linkers from '../../dataStructure/linkedList';
import Tree from '../../dataStructure/tree';
import _ from 'lodash';

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
    this.state = {};
  }

  handleDroppedComponent(droppedInItem) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
      dropTop: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentState.componentID !== this.props.componentState.componentID) {

      console.log('hellloooo', this.props.tree);

      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[nextProps.componentState.componentName],
          nextProps.componentState.dropTarget
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[nextProps.componentState.componentName],
          nextProps.componentState.dropTarget,
          tree
        );
        // tree.add(
        //   dragItems[nextProps.componentState.componentName],
        //   nextProps.componentState.dropTarget,
        //   dragItems[nextProps.componentState.componentName],
        //   tree.traverseBF
        // );
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
      console.log('treeeeeeeeeeeee', tree)
      tree.traverseBF(function (node) {
        treeArray.push([node.component, node.dropComponent]);
      });
    }

    const treeMap = _.map(treeArray, (code, index) => <div key={index}><div>{code[0]}</div> <div>{code[1]}</div></div>);

    var linkedListArray = [];

    var componentNode = head;
    while(componentNode) {
      linkedListArray.push(componentNode.component);
      componentNode = componentsLinkedList[componentNode.next];
    }

    const linkedListMap = _.map(linkedListArray, (code, key) => <li key={key}>{code}</li>);

    return (
      <div style={styles.bottomUp}>
        <ul>{treeMap}</ul>
      </div>
    );
  }
}

export default reduxView;
