import React from 'react';

import ReduxView from './reduxView';
import ComponentView from './componentView';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <article className="center-content">
        <h1>Hello World from React</h1>
        <h2>This is the Main Page</h2>
        <ComponentView />
        <ReduxView />
      </article>
    );
  }
}

export default View;
