import React from 'react';

import ReduxView from './reduxView';
import ComponentView from './componentView';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item:null,
      count: 0
    };
    this.AddedComponent = this.AddedComponent.bind(this);
  }

  AddedComponent(someItem) {
    var newCount = this.state.count+1;
    this.setState({item:someItem, count: newCount});

  }

  render() {

    return (
      <article className="center-content">
        <h1>Hello World from React</h1>
        <h2>This is the Main Page</h2>
        <div>{ComponentView}</div>
        <ComponentView added={this.AddedComponent.bind(this)}/>
        <ReduxView newComponentName={this.state.item} newComponentID={this.state.count}/>
      </article>
    );
  }
}

export default View;
