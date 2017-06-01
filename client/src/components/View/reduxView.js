import React from "react"
import { connect } from "react-redux"
import ReactDOMServer from 'react-dom/server';
import { fetchUser } from "../../actions/userActions"
import { fetchCode, addCode, clearCode } from "../../actions/codeActions"
import dragItems from '../dragItems.js'

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    code: store.code.code,
  };
})
class reduxView extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  fetchCode() {
    this.props.dispatch(fetchCode());
  }

  addCodeClick() {
    this.props.dispatch(addCode('3', dragItems.button ));
  }
  //#################
  addCodeClick1() {
    this.props.dispatch(addCode('3', dragItems.icon ));
  }
  addCodeClick2() {
    this.props.dispatch(addCode('3', dragItems.card ));
  }
  //#############

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }

  render() {
    const { user, code } = this.props;
    // user = this.props.user;
    // code = this.props.code
    if (!code.length) {
      return (
        <div>
          <h1>{user.name} <small>{user.age}</small></h1>
          <button onClick={this.fetchCode.bind(this)}>load code</button>
        </div>
      );
    }

    const mappedCode = code.map((code, key) => <li key={key}>{code.text}</li>);

    return (
      <div>
        <h1>{user.name} <small>{user.age}</small></h1>
        <button onClick={this.addCodeClick.bind(this)}>add button</button>
        <button onClick={this.addCodeClick1.bind(this)}>add icon</button>
        <button onClick={this.addCodeClick2.bind(this)}>add card</button>
        <button onClick={this.clearCodeClick.bind(this)}>clear code</button>
        <ul>{mappedCode}</ul>
      </div>
    );
  }
}

export default reduxView;
