import React from 'react';
import { connect } from 'react-redux';
import { addToTail, addToHead } from '../../actions/codeActions';
import dragItems from '../dragItems';
import linkers from '../../dataStructure/linkedList';
import Tree from '../../dataStructure/tree';
import _ from 'lodash';

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
      console.log('helloooo');

      var tree = new Tree('one');
      tree.add('two', 'one', tree.traverseBF);
      tree.add('three', 'two', tree.traverseBF);
      console.log(tree);
      tree.remove('three', 'two', tree.traverseBF);
      console.log('TREEEEE', tree);

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

    }
  }

  render() {
    const { components, componentsLinkedList, head } = this.props;

    var linkedListArray = [];

    var componentNode = head;
    while(componentNode) {
      linkedListArray.push(componentNode.component);
      componentNode = componentsLinkedList[componentNode.next];
    }

    const linkedListMap = _.map(linkedListArray, (code, key) => <li key={key}>{code}</li>);

    return (
      <div style={styles.bottomUp}>
        <ul>{linkedListMap}</ul>
      </div>
    );
  }
}

export default reduxView;
