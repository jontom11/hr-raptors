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
    tree: store.code.tree,
    item: store.code.item,
    currentRowObject: store.code.currentRowObject,
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
        </div>),
      rowObject: this.props.tree.rowObject,
    };
    this.handleDroppedComponent = this.handleDroppedComponent.bind(this);
  }

  handleDroppedComponent(droppedInItem, ID, rowObject) {
    this.props.handleDrop(droppedInItem, ID, rowObject);
  }

  componentWillReceiveProps(nextProps) {
    var componentName = nextProps.componentState.componentName;
    var uniqueID = nextProps.componentState.ID;
    var rowObject = nextProps.componentState.rowObject || {};
    var isRow = false;
    var isUpdateRowObject = false;
    // Checks if dropped component's name is a rowCol
    // if so populate rowObject with number of cols in order to render dnd targets
    if (_.startsWith(componentName, 'rowCol')) {
      var colNum = componentName.slice(6);
      isRow = true;
      for (var i = 0; i < colNum; i++) {
        rowObject['dnd' + i] = false;
      }
    } else if (_.startsWith(uniqueID, 'dnd')) {
      isRow = true;
      var dndToCompIndex = uniqueID[3];
      uniqueID = uniqueID.slice(4);
      _.forEach(nextProps.componentState.rowObject, (col, index) => {
        if (dndToCompIndex === index[3]) {
          delete rowObject['dnd' + dndToCompIndex];
          rowObject['col' + dndToCompIndex] = dragItems[componentName];
        }
      });
      isUpdateRowObject = true;
    }

    if (nextProps.componentState.counter !== this.props.componentState.counter) {
      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[componentName],
          rowObject,
          isRow
        );
        this.props.dispatch(updateTree(tree));
      } else if (uniqueID === 'head') {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[componentName],
          rowObject,
          isRow
        );
        this.props.dispatch(updateTree(tree));
      } else if (isUpdateRowObject) {
        var tree  = this.props.tree;
        tree.updateRowObject(
          uniqueID,
          tree.traverseBF,
          rowObject
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree.add(
          dragItems[componentName],
          uniqueID,
          tree.traverseBF,
          rowObject,
          isRow
        );
        this.props.dispatch(updateTree(tree));
      }
    }

  }

  render() {
    const { tree } = this.props;

    var treeArray = [];
    var colObject = {1: 12, 2: 6, 3: 4, 4: 3, 12: 1};

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = tree.traverseRendering();
    }


    _.forEach(treeObject, (node) => {

      if (Object.keys(node.rowObject).length > 0) {

        var colNum = colObject[Object.keys(node.rowObject).length];
        var colClass = `col s${colNum}`;
        var saveRowObject = node.rowObject;

        var newRowObject = _.map(node.rowObject, (col, index) => {
          if (_.startsWith(index, 'dnd')) {
            var newToID = index + node.ID;
           return (
            <div className={colClass} key={index}>
              <DropTarget
                handleDrop={this.handleDroppedComponent.bind(this)}
                toID={newToID}
                oldTree={tree}
                rowObject={node.rowObject}
              />
            </div>);
          } else {
            return (
              <div className={colClass} key={index}>
                {col}
              </div>
            );
          }
        });
        node.rowObject = newRowObject;

      }

      treeArray.push(node);

    });

    const treeMap = _.map(treeArray, (node, index) => (
      <div key={index}>
        <div className="row">
          { node.isRow ?
            node.rowObject :
            <div>{node.component}</div>
          }
        </div>
        <div className="col s12" id={node.ID}>
            <DropTarget
            handleDrop={this.handleDroppedComponent.bind(this)}
            toID={node.ID}
            oldTree={tree}
            />
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
