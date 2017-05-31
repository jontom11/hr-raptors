import React from 'react';
import SingleComponent from './component'

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
          <SingleComponent/>
        <div className="left">
        </div>
      </div>
    );
  }
}

export default SideBar;
