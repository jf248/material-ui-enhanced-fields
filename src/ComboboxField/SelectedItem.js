import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Chip, withStyles } from '@material-ui/core';

const styles = theme => ({
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit / 2,
  },
  hasFocus: {
    backgroundColor: theme.palette.primary.main,
  },
});

SelectedItem.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  deselect: PropTypes.func.isRequired,
  hasFocus: PropTypes.bool,
  item: PropTypes.any.isRequired,
  itemToString: PropTypes.func.isRequired,
};

function SelectedItem(props) {
  const {
    classes,
    className: classNameProp,
    deselect,
    hasFocus,  // eslint-disable-line no-unused-vars
    item,
    itemToString,
    ...rest
  } = props;

  const className = classnames(
    classes.chip,
    { [classes.hasFocus]: hasFocus },
    classNameProp,
  );

  return (
    <Chip
      className={className}
      onDelete={deselect}
      label={itemToString(item)}
      {...rest}
    />
  );
}

export default withStyles(styles)(SelectedItem);
