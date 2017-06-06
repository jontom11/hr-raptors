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

    if (Object.keys(this.props.tree).length > 0) {
      tree.traverseBF(function (node) {
        treeArray.push([node.component, node.dropComponent]);
      });
    }

    const treeMap = _.map(treeArray, (code, index) => <div key={index}>{code[0]}</div>);

    return (
       <article className="center-content code-view">
        <div className="code-view display-linebreak" >
          <CodeBoilerPlate code={treeMap} />
        </div>
      </article>
    )
  }
}

export default Code;
