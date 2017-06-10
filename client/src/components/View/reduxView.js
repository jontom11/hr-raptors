import React from 'react';
import { connect } from 'react-redux';
import { updateTree } from '../../actions/codeActions';
import dragItems from '../../dragItems';
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
    this.props.handleDrop(droppedInItem, ID);
  }

  componentWillReceiveProps(nextProps) {
    var componentName = nextProps.componentState.componentName;

    if (_.startsWith(componentName, 'rowCol')) {
      var colNum = componentName.slice(6, componentName.length);
      var colComponentsObject = {};
      for (var i = 0; i < colNum; i++) {
        colComponentsObject['dnd' + i] = false;
      }
    }

    if (nextProps.componentState.componentID !== this.props.componentState.componentID) {
      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[componentName],
          colComponentsObject
        );
        this.props.dispatch(updateTree(tree));
      } else if (nextProps.componentState.ID === 'head') {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[componentName],
          colComponentsObject
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree.add(
          dragItems[componentName],
          nextProps.componentState.ID,
          tree.traverseBF,
          colComponentsObject
        );
        this.props.dispatch(updateTree(tree));
      }
    }

  }

  render() {
    const { tree } = this.props;

    var treeArray = [];
    var colsComponentArray = [];

    // check colComponentsObject
      // if false push DropTarget

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = tree.traverseRendering();
    }
var colObject = {1: 12, 2: 6, 3: 4, 4: 3, 12: 1};

    _.forEach(treeObject, (node) => {
      if (node.colComponents) {
        var colNum = colObject[Object.keys(node.colComponents).length];
        var colClass = `col s${colNum}`;

          node.colComponents = _.map(node.colComponents, (col) => {
          if (!col) {
            return (
              <div className={colClass}>
              <DropTarget
              handleDrop={this.handleDroppedComponent.bind(this)}
              toID={node.ID}
              oldTree={tree}
              dispatch={this.props.dispatch} />
              </div>)
          }
        });
      }
      treeArray.push(node);
    });

    const treeMap = _.map(treeArray, (code, index) => (
      <div key={index}>
        <div className="row">
        { code.colComponents ?
          code.colComponents :
          <div>{code.component}</div>
        }
        </div>
        <div className="col s12" id={code.ID}>
          { code.colComponents ?
            null :
            <DropTarget
            handleDrop={this.handleDroppedComponent.bind(this)}
            toID={code.ID}
            oldTree={tree}
            dispatch={this.props.dispatch}
            />
          }
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
