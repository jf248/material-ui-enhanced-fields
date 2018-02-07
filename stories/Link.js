import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Typography, withStyles } from 'material-ui';

const styles = theme => ({
  root: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

Link.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
};

function Link(props) {
  const {
    children,
    classes,
    className,
    onClick,
    ...rest
  } = props;

  return (
    <Typography
      className={classnames(classes.root, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export default withStyles(styles)(Link);
