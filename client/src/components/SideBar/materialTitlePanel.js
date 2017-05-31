import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  },
  header: {
    backgroundColor: '#03a9f4',
    color: 'white',
    padding: '2.5vh',
    fontSize: '1.5em',
    width: '100%',
  },
};

const MaterialTitlePanel = (props) => {
  const rootStyle = Object.assign({}, styles.root, props.style);

  return (
    <div style={rootStyle}>
      <div style={styles.header}>{props.title}</div>
    </div>
  );
};

MaterialTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default MaterialTitlePanel;
