import React from 'react';

import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"

import CodeBoilerPlate from './codeBoilerPlate'

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
    var renderLinkedList = [];

    if (Object.keys(this.props.tree).length > 0) {
      var treeObject = tree.traverseRendering();
    }


    _.forEach(treeObject, (node) => {

      if (node.isRow) {

        var colNum = colObject[Object.keys(node.rowObject.linkedList).length];
        var colClass = `col s${colNum}`;
        var saveRowObject = node.rowObject;

        var current = node.rowObject.linkedList[node.rowObject.head.key];
        node.rowObject.renderLinkedList = [];
        while (current) { // while not null

            if (_.startsWith(current.key, 'dnd')) {
              var newToID = current.key + node.ID;
              node.rowObject.renderLinkedList.push(
              <div className={colClass} key={current.key}></div>);
            } else {
              node.rowObject.renderLinkedList.push(
                <div className={colClass} key={current.key}>
                  {current.component}
                </div>
              );
            }
            current = node.rowObject.linkedList[current.next];
        }
      }
      treeArray.push(node);
    });

    const treeMap = _.map(treeArray, (node, index) => (
      <div key={index}>
        <div className="row">
          { node.isRow ?
            node.rowObject.renderLinkedList.map((col) => col) :
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
