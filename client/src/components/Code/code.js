import React from 'react';

import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"

import CodeBoilerPlate from './codeBoilerPlate'

@connect((store) => {
  return {
    code: store.code.code,
  };
})
class Code extends React.Component {

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {

    const { code } = this.props;

    const mappedCode = code.map((code, index) =>
      <div key={index} className="codepart">
        {code.text}
      </div>
    );

    return (
       <article className="center-content code-view">
        <div className="code-view display-linebreak" >
          <CodeBoilerPlate code={mappedCode} />
        </div>
      </article>
    )
  }
}

export default Code;
