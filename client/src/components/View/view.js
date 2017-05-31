import React from 'react';

import ReduxView from './reduxView';
import ComponentView from './componentView';
import HTML5Backend from 'react-dnd-html5-backend';
import SingleComponent from '../Sidebar/component';


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
        <ComponentView />
        <ReduxView />
      </article>
    );
  }
}

export default View;
