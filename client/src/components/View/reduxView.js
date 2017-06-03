import React from "react"
import { connect } from "react-redux"
import { addCode } from "../../actions/codeActions"
import dragItems from '../dragItems.js'


const styles = {
  bottomUp: {
    margin: '-2% 0',
  },
};

@connect((store) => {
  return {
    code: store.code.code,
  };
})
class reduxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newComponentID !== this.props.newComponentID) {
      this.props.dispatch(addCode(newProps.newComponentID, dragItems[newProps.newComponentName]));
    }
  }

  render() {
    const { code } = this.props;
    const mappedCode = code.map((code, key) => <li key={key}>{code.text}</li>);

    return (
      <div style={styles.bottomUp}>
        <ul>{mappedCode}</ul>
      </div>
    );
  }
}

export default reduxView;
