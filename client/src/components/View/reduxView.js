import React from 'react';
import { connect } from 'react-redux';
import { addCode, addCodeTop, addToTail, addToHead } from '../../actions/codeActions';
import dragItems from '../dragItems';
import linkers from './linkedList';

const styles = {
  bottomUp: {
    margin: '-2% 0',
  },
};

@connect((store) => {
  return {
    components: store.code.components,
    componentsLinkedList: store.code.componentsLinkedList,
    item: store.code.item,
    head: store.code.head,
    tail: store.code.tail,
  };
})
class reduxView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentState.componentID !== this.props.componentState.componentID) {

      /* ADDING TO LINKED LIST */
      if (nextProps.componentState.dropTop) {
        this.props.dispatch(addToHead(
          linkers.addToHead(
            this.props.componentsLinkedList,
            dragItems[nextProps.componentState.componentName],
            nextProps.componentState.isDropped,
            this.props.item,
            this.props.head,
            this.props.tail,
          )
        ));
      } else {
        this.props.dispatch(addToTail(
          linkers.addToTail(
            this.props.componentsLinkedList,
            dragItems[nextProps.componentState.componentName],
            nextProps.componentState.isDropped,
            this.props.item,
            this.props.head,
            this.props.tail,
          )
        ));
      }

      /* ADDING TO VIEW */
      if (nextProps.componentState.dropTop) {
        this.props.dispatch(addCodeTop(
          nextProps.componentState.componentID,
          dragItems[nextProps.componentState.componentName],
          nextProps.componentState.isDropped,
          nextProps.componentState.dropTarget
        ));
      } else {
        this.props.dispatch(addCode(
          nextProps.componentState.componentID,
          dragItems[nextProps.componentState.componentName],
          nextProps.componentState.isDropped,
          nextProps.componentState.dropTarget
        ));
      }



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
