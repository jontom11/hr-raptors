import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav>
        <div className="nav">
          <AppBar
          className="navbar"
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={<FlatButton onClick={this.props.onClick} label="Code" />}
          />
        </div>
      </nav>
    );
  }
}

export default Nav;
