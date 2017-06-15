import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

import MaterialTitlePanel from './navTitlePanel';
import components from '../../dragItems';
import SingleComponent from './component';

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
  const componentsKey = [];
  _.forEach(components, (e, k) => {
    componentsKey.push(k);
  });

  return (
    <div>
    <MaterialTitlePanel title="Material Studio" style={style} />
      <div style={styles.content}>
        <h3 href="#" style={styles.sidebarLink}>Components</h3>
        <div style={styles.divider} />
        <SingleComponent/>
        {componentsKey.map((component, index) =>
          <FlatButton key={index} fullWidth={true} style={styles.sidebarLink}><SingleComponent component={component} /></FlatButton>
        )}
      </div>
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
