import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchDefaultView, changeDropComponent, incrementIndex, updateAll } from "../../actions/codeActions"

import ReduxView from './reduxView';
import ComponentView from './componentView';
import componentData from '../dragItems';
import linkers from '../linkedListView';

@connect((store) => {
  return {
    view: store.code.view,
    index: store.code.index,
    tail: store.code.tail,
    head: store.code.head,
    item: store.code.item,
    list: store.code.list,
  };
})
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDefault:
        {
          code: null,
          componentView: (
            <div className="col s12">
              <ComponentView handleDroppedComponent={this.handleDroppedComponent.bind(this)} />
            </div>),
          isDropped: false,
        },
    };
  }

  componentDidMount() {
    console.log('DID MOUNT', this.props.index);
    if (this.props.view.length === 0) {
      // console.log('LIIINNKERS', linkers.addToTail(this.state.viewDefault, this.props));
     // this.props.dispatch(updateAll(Object.assign({}, linkers.addToTail(this.state.viewDefault, this.props))));
      this.props.dispatch(fetchDefaultView(this.state.viewDefault));
    }
  }
  componentDidUpdate() {
    console.log('DID UPDATE ============================', this.props.index)

  }

  componentWillUpdate() {
    console.log('WILL UPDATE ============================')
  }

  handleDroppedComponent(componentKey) {
    console.log('KEY', componentKey);
    console.log('PROPS_VIEW', this.props.view);
    console.log('INDEX', this.props.index);
    var key = componentKey.component;

    /* LINKED LIST */
    // var dropComponent = Object.assign({}, this.state.viewDefault, {isDropped: true, code: componentData[key]});
    // this.props.dispatch(updateAll(Object.assign({}, linkers.removeTail(this.props))));
    // this.props.dispatch(updateAll(Object.assign({}, linkers.addToTail(dropComponent, this.props))));
    // this.props.dispatch(updateAll(Object.assign({}, linkers.addToTail(this.state.viewDefault, this.props))));

    // this.props.dispatch(updateAll(Object.assign({}, linkers.removeHead(this.props))));
    // this.props = Object.assign({}, linkers.removeTail(this.props));
    // this.props = Object.assign({}, this.props, {list: linkers.addToTail(this.props, dropComponent)});
    // this.props = Object.assign({}, this.props, {list: linkers.addToTail(this.props, this.state.viewDefault)});
    /* LINKED LIST */

    this.props.view[this.props.index] = Object.assign({}, this.state.viewDefault, {isDropped: true, code: componentData[key]});
    this.props.view[this.props.index + 1] = this.state.viewDefault;
    // this.props.dispatch(incrementIndex(this.props.index + 1));
    this.props.dispatch(changeDropComponent(this.props.view, this.props.index + 1));
    console.log('KEY', componentKey);
    console.log('PROPS_VIEW', this.props.view);
    console.log('INDEX', this.props.index);

  }

  render() {
    const { view, index } = this.props;

    return (
      <article className="center-content">
        <h1>{index}</h1>

        {view.map((item, index) =>
          <div className="row" key={index}>
            {!item.isDropped ?
              item.componentView :
              item.code
            }
          </div>
        )}

        <ReduxView />
      </article>
    );
  }
}

export default View;
