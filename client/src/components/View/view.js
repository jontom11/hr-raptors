import React from 'react';
import { connect } from "react-redux"
import { fetchUser } from "../../actions/userActions"
import { clearCode } from "../../actions/codeActions"

import ReduxView from './reduxView';
import DropTarget from './dropTarget';

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
      showingOptionsView: false
    };
    this.handleDroppedComponent = this.handleDroppedComponent.bind(this);
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
      ID: ID,
    });
  }

  render() {
    const { tree } = this.props;

    return (
      <article className="center-content">
          <DropTarget
            handleDrop={this.handleDroppedComponent.bind(this)}
            oldTree={tree}
            dispatch={this.props.dispatch}
            toID="head"
          />
        <ReduxView
          componentState={this.state}
          handleDrop={this.handleDroppedComponent.bind(this)}
          toggleOptionView={this.props.toggleOptionView}
        />

      </article>
    );
  }
}

export default View;
