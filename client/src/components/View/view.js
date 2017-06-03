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
    code: store.code.code,
  };
})
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: null,
      componentID: 0,
    };
    this.handleDroppedComponent = this.handleDroppedComponent.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }

  handleDroppedComponent(droppedInItem) {
    var newCount = this.state.componentID + 1;
    this.setState({
      componentName: droppedInItem,
      componentID: newCount,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <article className="center-content">
        <h1>{user.name} <small>{user.age}</small></h1>
        <button onClick={this.clearCodeClick.bind(this)}>clear code</button>

        <div className="row">
          <div className="col s4"><DropTarget handleDrop={this.handleDroppedComponent.bind(this)}/></div>
          <div className="col s4"><DropTarget handleDrop={this.handleDroppedComponent.bind(this)}/></div>
          <div className="col s4"><DropTarget handleDrop={this.handleDroppedComponent.bind(this)}/></div>
        </div>

        <DropTarget handleDrop={this.handleDroppedComponent.bind(this)}/>
        <ReduxView componentName={this.state.componentName} componentID={this.state.componentID}/>
        <DropTarget handleDrop={this.handleDroppedComponent.bind(this)}/>

      </article>
    );
  }
}

export default View;
