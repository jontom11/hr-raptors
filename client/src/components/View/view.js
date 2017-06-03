import React from 'react';
import { connect } from "react-redux"
import { fetchUser } from "../../actions/userActions"
import { clearCode } from "../../actions/codeActions"

import ReduxView from './reduxView';
import ComponentView from './componentView';

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
      currentItem: null,
      currentItemID: 0,
    };
    this.AddedComponent = this.AddedComponent.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }

  AddedComponent(droppedInItem) {
    var newCount = this.state.currentItemID + 1;
    this.setState({
      currentItem: droppedInItem,
      currentItemID: newCount,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <article className="center-content">
        <h1>{user.name} <small>{user.age}</small></h1>
        <button onClick={this.clearCodeClick.bind(this)}>clear code</button>
        <ComponentView added={this.AddedComponent.bind(this)}/>
        <ReduxView newComponentName={this.state.currentItem} newComponentID={this.state.currentItemID}/>
        <ComponentView added={this.AddedComponent.bind(this)}/>

      </article>
    );
  }
}

export default View;
