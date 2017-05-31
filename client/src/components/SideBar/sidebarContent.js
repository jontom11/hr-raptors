import React from 'react';
import MaterialTitlePanel from './materialTitlePanel';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

const dummyComponents = ['Component 1', 'Component 2', 'Component 3', 'Component 4', 'Component 5', 'Component 6'];

const styles = {
  sidebar: {
    maxHeight: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '1vh 0px',
    color: '#000',
    textDecoration: 'none',
    lineHeight: 'inherit',

  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: '2.5vh',
    height: '100%',
    backgroundColor: 'white',
  },
};

const SidebarContent = (props) => {
  const style = props.style ? Object.assign({}, styles.sidebar, props.style) : styles.sidebar;

  return (
    <div>
    <MaterialTitlePanel title="Material UI" style={style} />
      <div style={styles.content}>
        <h3 href="#" style={styles.sidebarLink}>Components</h3>
        <div style={styles.divider} />
        {dummyComponents.map((component, index) =>
          <FlatButton key={index} fullWidth={true} style={styles.sidebarLink}>{component}</FlatButton>
        )}
      </div>
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
