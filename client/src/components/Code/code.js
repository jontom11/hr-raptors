import React from 'react';
import ReactDOMServer from 'react-dom/server';


import { connect } from "react-redux"
import { fetchCode } from "../../actions/codeActions"
var HtmlToReactParser = require('html-to-react').Parser;
//
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
    const { code } = this.props;
    var codeString ='';
    var count = 0;
    const mappedCode = code.map((code, key) =>
      <div key={key} className="codepart">
        {console.log(code.text)}
        {count++} {ReactDOMServer.renderToStaticMarkup(<div>{code.text}</div>)}
      </div>
    )

      mappedCode.forEach((obj, index) =>
        codeString+=obj.props.children[3],
      )
   
        var perfstring = ('<div>' + codeString +'</div>');
        var hardCode = "<div><div className='display-linebreak'>Bob</div></div>" ;
        var pretty = beautify_html(perfstring, {'eol':'\n','end-with-newline':true, 'wrap-attributes':'force', 'extra-liners':'a'});
          console.log(pretty);
            console.log(hardCode === pretty);
    return (
      <article className="center-content">
        <h1>Materialize Studio</h1>
        <h2>Your project code goes here</h2>
        <div className="scrollbar display-linebreak" id="style-1">
          {pretty} 
        </div>
      </article>
    )
  }
}

export default Code;
