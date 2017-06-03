import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"
//

var HtmlToReactParser = require('html-to-react').Parser;

let beautify_html = require('js-beautify').html;
let beautify = require('js-beautify');

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

    const { view, code } = this.props;

    const mappedCode = view.map((code, index) =>
      <div key={index} className="codepart">
        {code.code}
      </div>
    );

    return (
       <article className="center-content">
        <div className="scrollbar  display-linebreak" id="style-1">
          <CodeBoilerPlate code={mappedCode} />
        </div>
      </article>
    )
  }
}

export default Code;
