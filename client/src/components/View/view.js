import React from 'react';
import { connect } from "react-redux"
import { fetchUser } from "../../actions/userActions"
import { clearCode } from "../../actions/codeActions"

import ReduxView from './reduxView';
import DropTarget from './dropTarget';
import shortid from 'shortid';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
  };
})
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: null,
      ID: null,
      componentID: 0,
      dropTarget: (
        <div className="col s12">
          <DropTarget handleDroppedComponent={this.handleDroppedComponent.bind(this)} />
        </div>),
      isDropped: false,
      dropTop: false,
    };
    this.handleDroppedComponent = this.handleDroppedComponent.bind(this);
    this.handleDropChange = this.handleDropChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }

  handleDroppedComponent(droppedInItem, ID) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
      dropTop: false,
      ID: ID,
    });
  }

  handleDroppedComponentTop(droppedInItem) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
      dropTop: true,
    });
  }

  handleDropChange(droppedInItem, ID) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
      dropTop: true,
      ID: ID,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <article className="center-content">
        <div className="col s12" id={shortid.generate()}>
          <DropTarget handleDrop={this.handleDroppedComponent.bind(this)} context={this} />
        </div>
        <ReduxView componentState={this.state} handleDrop={this.handleDroppedComponent.bind(this)} handleChange={this.handleDropChange.bind(this)} />

      </article>
    );
  }
}

export default View;
