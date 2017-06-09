import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

import MaterialTitlePanel from './navTitlePanel';
import components from '../../dragItems';
import SingleComponent from './component';

const styles = {
  OptionBar: {
    maxHeight: '100%',
  },
  OptionBarLink: {
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

const OptionbarContent = (props) => {
  const style = props.style ? Object.assign({}, styles.OptionBar, props.style) : styles.OptionBar;

  return (
    <div>
    <MaterialTitlePanel title="Options" style={style} />
    <button type='button'>Delete me</button>
      <div style={styles.content}>
        <h3 href="#" style={styles.OptionBarLink}></h3>
      </div>
    </div>
  );
};

OptionbarContent.propTypes = {
  style: PropTypes.object,
};

export default OptionbarContent;
