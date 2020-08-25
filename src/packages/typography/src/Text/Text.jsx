import React from 'react';
import PropTypes from 'prop-types';
import classes from './Text.styles.less';

export default function Text({ children }) {
  return <div className={classes.text}>{children}</div>;
}

Text.propTypes = {
  children: PropTypes.node,
};
