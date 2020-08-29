import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@monorepo/typography';
import classes from './Button.styles.less';

export default function Button({ children, ...others }) {
  return (
    <button className={classes.button} type="button" {...others}>
      <Text>{children}</Text>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
};
