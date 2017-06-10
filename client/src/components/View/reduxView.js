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
    var uniqueID = nextProps.componentState.ID;
    var rowObject = nextProps.componentState.rowObject || {};
    // Checks if dropped component's name is a rowCol
    // if so populate rowObject with number of cols in order to render dnd targets
    console.log('++++++++++++++++++++++++++++', uniqueID);
    if (_.startsWith(componentName, 'rowCol')) {
      var colNum = componentName.slice(6, 7);
      for (var i = 0; i < colNum; i++) {
        rowObject['dnd' + i] = false;
      }
    } else if (_.startsWith(uniqueID, 'dnd')) {
      var dndToCompIndex = uniqueID[4];
      uniqueID = uniqueID.slice(5);
      console.log('-------------------------------', uniqueID);
      // Need to get ROW length, but hard code it in for now
      _.forEach(rowObject, (col, index) => {
        if (dndToCompIndex === index[4]) {
          rowObject['col' + index[4]] = dragItems[componentName];
        }
      });
    }
    // Check if start of unique ID comes from dnd target
      // get dnd object unique ID in order to look up node position in the tree
      // get the col Index so we can replace that row index with dragged item
        // iterate through

    if (nextProps.componentState.counter !== this.props.componentState.counter) {
      if (Object.keys(this.props.tree).length === 0) {
        var tree = new Tree(
          dragItems[componentName],
          rowObject
        );
        this.props.dispatch(updateTree(tree));
      } else if (uniqueID === 'head') {
        var tree = this.props.tree;
        tree = tree.pushToHead(
          dragItems[componentName],
          rowObject
        );
        this.props.dispatch(updateTree(tree));
      } else {
        var tree = this.props.tree;
        tree.add(
          dragItems[componentName],
          uniqueID,
          tree.traverseBF,
          rowObject
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


    // traverse tree
      // check node has rowComponents
        // var colNum = colObject[Object.keys(node.rowComponents).length];
        // var colClass = `col s${colNum}`;

        // iterate through rowComponents
        // create a new unique ID for Drop Target component so key plus original unique ID
        // if key, current position, starts with dnd then add Drop Component to rowComponents
        //         return (
        //           <div className={colClass} key={key}>
        //             <DropTarget
        //               handleDrop={this.handleDroppedComponent.bind(this)}
        //               toID={newToID}
        //               oldTree={tree}
        //               dispatch={this.props.dispatch}
    //                   rowObject={node.rowObject}/>
        //           </div>)
        // else do nothing because it has drop component saved in that position
    // push node back to treeArray


    _.forEach(treeObject, (node) => {
      if (Object.keys(node.rowObject).length > 0) {
        var colNum = colObject[Object.keys(node.rowObject).length];
        var colClass = `col s${colNum}`;
        var newRowObject = _.map(node.rowObject, (col, index) => {
          if (_.startsWith(index, 'dnd')) {
            var newToID = index + node.ID;
            console.log('============================', newToID);
           return (
            <div className={colClass} key={index}>
              <DropTarget
                handleDrop={this.handleDroppedComponent.bind(this)}
                toID={newToID}
                oldTree={tree}
                dispatch={this.props.dispatch}
                rowObject={node.rowObject}
              />
            </div>);
          } else {
            return col;
          }
        });


        node.rowObject = newRowObject;

        // for(var i = 0; i < Object.keys(node.rowObject).length; i++) {
        //   if (Object.keys(node.rowObject)[i] === newRowObject[Object.keys(newRowObject)[i]]) {
        //
        //   }
        // }
      }
      treeArray.push(node);
    });



    const treeMap = _.map(treeArray, (node, index) => (
      <div key={index}>
        <div className="row">
          { Object.keys(node.rowObject.length > 0) ?
            node.rowObject :
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
