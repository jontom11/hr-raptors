import React from 'react';

import ReduxView from './reduxView';
import ComponentView from './componentView';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null,
      currentItemID: 0,
    };
    this.AddedComponent = this.AddedComponent.bind(this);
  }

  AddedComponent(droppedInItem) {
    var newCount = this.state.currentItemID+1;
    this.setState({
      currentItem:droppedInItem,
      currentItemID: newCount
    });
  }

  render() {

    return (
      <article className="center-content">

        <ReduxView newComponentName={this.state.currentItem} newComponentID={this.state.currentItemID}/>
        <ComponentView added={this.AddedComponent.bind(this)}/>

      </article>
    );
  }
}

export default View;
