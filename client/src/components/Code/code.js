import React from 'react';

import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"

import CodeBoilerPlate from './codeBoilerPlate'

@connect((store) => {
  return {
    components: store.code.components,
    componentsLinkedList: store.code.componentsLinkedList,
    head: store.code.head,
  };
})
class Code extends React.Component {

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {

    const { components, componentsLinkedList, head } = this.props;

    const mappedCode = components.map((code, index) =>
      <div key={index} className="codepart">
        {code.componentCode}
      </div>
    );

    var linkedListArray = [];

    var componentNode = head;
    while(componentNode) {
      linkedListArray.push(componentNode.component);
      componentNode = componentsLinkedList[componentNode.next];
    }

    const linkedListMap = _.map(linkedListArray, (code, key) => <li key={key}>{code}</li>);

    return (
       <article className="center-content code-view">
        <div className="code-view display-linebreak" >
          <CodeBoilerPlate code={linkedListMap} />
        </div>
      </article>
    )
  }
}

export default Code;
