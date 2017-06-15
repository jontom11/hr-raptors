import React from 'react';
import { connect } from 'react-redux';
import { fetchCode } from '../../actions/codeActions';
import _ from 'lodash';

import CodeBoilerPlate from './codeBoilerPlate';

@connect((store) => {
  return {
    components: store.code.components,
    tree: store.code.tree,
    componentsLinkedList: store.code.componentsLinkedList,
    head: store.code.head,
  };
})
class Code extends React.Component {

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {

    const { tree } = this.props;
    var treeArray = [];
    var colObject = {1: 12, 2: 6, 3: 4, 4: 3, 12: 1};
    /*
     SAME AS REDUX VIEW: Render Linked List Object populated with Render Linked List Rows allows for linked list of
     columns to be rendered within this component without storing the rendered object in the tree.
     Render Linked List Rows are unique dropped component with defined number of cols.
     */
    var renderLinkedListObject = {};

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = Object.assign({}, tree.traverseRendering());
    }


    _.forEach(treeObject, (node) => {

      if (node.isRow) {

        var colNum = colObject[Object.keys(node.rowObject.linkedList).length];
        var colClass = `col s${colNum}`;

        var current = node.rowObject.linkedList[node.rowObject.head.key];
        var renderLinkedListRow = [];
        while (current) { // while not null

            if (_.startsWith(current.key, 'dnd')) {
              renderLinkedListRow.push(
              <div className={colClass} key={current.key}>{null}</div>);
            } else {
              renderLinkedListRow.push(
                <div className={colClass} key={current.key}>
                  {current.component}
                </div>
              );
            }
            current = node.rowObject.linkedList[current.next];
        }
      }
      renderLinkedListObject[node.ID] = renderLinkedListRow;
      treeArray.push(node);
    });

    const treeMap = _.map(treeArray, (node, index) => (
      <div key={index} className={node.ID}>
        <div className="row">
          { node.isRow ?
            _.map(renderLinkedListObject, (col, index) => {
              return index === node.ID ? col : null;
            }) :
            <div>{node.component}</div>
          }
        </div>
      </div>));

    return (
       <article className="center-content code-view">
        <div className="code-view display-linebreak" >
          <CodeBoilerPlate tree={treeMap} />
        </div>
      </article>
    )
  }
}

export default Code;
