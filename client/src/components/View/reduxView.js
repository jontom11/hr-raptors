import React from 'react';
import { connect } from 'react-redux';
import { addCode } from '../../actions/codeActions';
import dragItems from '../dragItems.js';


const styles = {
  bottomUp: {
    margin: '-2% 0',
  },
};

@connect((store) => {
  return {
    components: store.code.components,
  };
})
class reduxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    if (newProps.componentID !== this.props.componentID) {
      this.props.dispatch(addCode(newProps.componentID, dragItems[newProps.componentName], this.state.viewDefault));
    }
  }

  render() {
    const { components } = this.props;
    const mappedCode = components.map((code, key) => <li key={key}>{code.componentCode}</li>);

    return (
      <div style={styles.bottomUp}>
        <ul>{mappedCode}</ul>
      </div>
    );
  }
}

export default reduxView;
