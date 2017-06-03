import React from "react"
import { connect } from "react-redux"
import { fetchUser } from "../../actions/userActions"
import { addCode, clearCode } from "../../actions/codeActions"
import dragItems from '../dragItems.js'


const styles = {
  bottomUp: {
    marginBottom: '-4%',
  },
};

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    code: store.code.code,
  };
})
class reduxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newComponentID !== this.props.newComponentID) {
      this.props.dispatch(addCode(newProps.newComponentID, dragItems[newProps.newComponentName]));
    }
  }

  clearCodeClick() {
    this.props.dispatch(clearCode());
  }


  render() {
    const { user, code } = this.props;
    const mappedCode = code.map((code, key) => <li key={key}>{code.text}</li>);

    return (
      <div style={styles.bottomUp}>
        <h1>{user.name} <small>{user.age}</small></h1>
        <button onClick={this.clearCodeClick.bind(this)}>clear code</button>
        <ul>{mappedCode}</ul>


      </div>
    );
  }
}

export default reduxView;
