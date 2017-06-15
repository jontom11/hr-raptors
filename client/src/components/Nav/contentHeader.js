import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
};

class ContentHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="left">
          {!this.props.state.docked ?
            <a onClick={this.props.menuButtonClick} style={styles.contentHeaderMenuLink}><i className="fa fa-bars" aria-hidden="true" /></a> :
            <a onClick={this.props.menuButtonClick} style={styles.contentHeaderMenuLink}><i className="fa fa-times" aria-hidden="true" /></a>}
          <Link to="/">
            <a style={styles.contentHeaderMenuLink} className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="View">
              <i className="fa fa-desktop" aria-hidden="true" />
            </a>
          </Link>
          <Link to="/code">
            <a style={styles.contentHeaderMenuLink} className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Code">
              <i className="fa fa-code" aria-hidden="true" />
            </a>
          </Link>
          <a onTouchTap={this.props.handleOpen} style={styles.contentHeaderMenuLink} className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Download">
            <i className="fa fa-download" aria-hidden="true" />
          </a>
          <Link to="/projects">
            <a onClick={this.props.loadButtonClick} style={styles.contentHeaderMenuLink} className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Profile">
              <i className="fa fa-user" aria-hidden="true"/>
            </a>
          </Link>
          <a href={"/login"} style={styles.contentHeaderMenuLink} className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Sign Out">
            <i className="fa fa-sign-out" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
}

export default ContentHeader;
