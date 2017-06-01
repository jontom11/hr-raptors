import React from 'react';
//
import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"
//

@connect((store) => {
  return {
    code: store.code.code,
  };
})

class Code extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     componentsCode: []
  //   };
  // }

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {
    const { code } = this.props;

    if (!code.length) {
      return (
        <article className="center">
          <div>
             We gonna need some code here
          </div>
        </article>
      );
    }

    const mappedCode = code.map((code, key) =>
      <div key={key} className="codepart">
        {code.text}
      </div>
    );

    return (
      <article className="center-content">
        <h1>Materialize Studio</h1>
        <h2>Your project code goes here</h2>
        <div className="scrollbar" id="style-1">
          {mappedCode}
        </div>
      </article>
    )
  }
}

export default Code;
