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

    // Checks if dropped component is a rowCol
    // if so populate colComponentObject in order to render dnd targets
    if (_.startsWith(componentName, 'rowCol')) {
      var colNum = componentName.slice(6);
      var rowComponentsObject = {};
      for (var i = 0; i < colNum; i++) {
        rowComponentsObject['dnd' + i] = false;
      }
    }

    // Check if unique ID comes from dnd target
    if (_.startsWith(nextProps.componentState.ID, 'dnd')) {
      var dndNodeID = nextProps.componentState.ID.slice(4);
      var colIndex = nextProps.componentState.ID[3];
      console.log('+++++++++++++++++++++++++++++++++++++++++++', dndNodeID);
      console.log('+++++++++++++++++++++++++++++++++++++++++++', colIndex);
      for (var i = 0; i < colNum; i++) {
        if (colIndex === i) {
          rowComponentsObject['col' + i] = dragItems[componentName];
        } else {
          rowComponentsObject['dnd' + i] = false;
        }
      }
      console.log('ColINdex', colIndex);
      console.log('dndNodeID', dndNodeID);
    }

    var uniqueID = dndNodeID || nextProps.componentState.ID;


    if (nextProps.componentState.counter !== this.props.componentState.counter) {
      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[componentName],
          rowComponentsObject
        );
        this.props.dispatch(updateTree(tree));
      } else if (uniqueID === 'head') {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[componentName],
          rowComponentsObject
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree.add(
          dragItems[componentName],
          uniqueID,
          tree.traverseBF,
          rowComponentsObject
        );
        this.props.dispatch(updateTree(tree));
      }
    }

  }

  render() {
    const { tree } = this.props;

    var treeArray = [];
    var colsComponentArray = [];

    // check rowComponentsObject
      // if false push DropTarget

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = tree.traverseRendering();
    }
var colObject = {1: 12, 2: 6, 3: 4, 4: 3, 12: 1};

    _.forEach(treeObject, (node) => {
      if (node.rowComponents) {
        var colNum = colObject[Object.keys(node.rowComponents).length];
        var colClass = `col s${colNum}`;

          node.rowComponents = _.map(node.rowComponents, (col, key) => {
            var newToID = key + node.ID;
            console.log('===========================================================', newToID)
          if (_.startsWith(key, 'dnd')) {
            return (
              <div className={colClass} key={key}>
              <DropTarget
              handleDrop={this.handleDroppedComponent.bind(this)}
              toID={newToID}
              oldTree={tree}
              dispatch={this.props.dispatch} />
              </div>)
          }
        });
      }
      treeArray.push(node);
    });

    const treeMap = _.map(treeArray, (node, index) => (
      <div key={index}>
        <div className="row">
        { node.rowComponents ?
          node.rowComponents :
          <div>{node.component}</div>
        }
        </div>
        <div className="col s12" id={node.ID}>
            <DropTarget
            handleDrop={this.handleDroppedComponent.bind(this)}
            toID={node.ID}
            oldTree={tree}
            dispatch={this.props.dispatch}
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
