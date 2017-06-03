import React from 'react';

import { connect } from 'react-redux';
import { fetchCode } from '../../actions/codeActions';

import CodeBoilerPlate from './codeBoilerPlate';

var HtmlToReactParser = require('html-to-react').Parser;

let beautify_html = require('js-beautify').html;
let beautify = require('js-beautify');

@connect((store) => {
  return {
    code: store.code.code,
    view: store.code.view,
  };
})

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  render() {
    const { view, code } = this.props;
 
      console.log(stringed);
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
