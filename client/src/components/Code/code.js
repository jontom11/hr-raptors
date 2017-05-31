import React from 'react';

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <article className="center-content">
        <h1>Hello World from React</h1>
        <h2>This is some code</h2>
      </article>
    );
  }
}

export default Code;
