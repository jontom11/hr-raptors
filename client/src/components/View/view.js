import React from 'react';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <article className="center">
        <h1>Hello World from React</h1>
        <h2>This is the Main Page</h2>
      </article>
    );
  }
}

export default View;
