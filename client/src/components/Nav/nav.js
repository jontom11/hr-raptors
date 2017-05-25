import React from 'react';

import AppBar from 'material-ui/AppBar';

class Nav extends React.Component {
  constructor(props){
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
          />
        </div>
      </nav>
      );
  }
}

export default Nav;
