import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Typography, withStyles } from 'material-ui';

const styles = theme => ({
  menuItem: {
    padding: '4px 16px 4px 24px',
  },
  highlighted: {
    backgroundColor: theme.palette.action.hover,
  }
});

MenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  downShiftProps: PropTypes.shape({
    getItemProps: PropTypes.func.isRequired,
    highlightedIndex: PropTypes.number,
    selectedItem: PropTypes.any,
  }).isRequired,
  index: PropTypes.number,
  item: PropTypes.any.isRequired,
  selectedItems: PropTypes.array,
};

MenuItem.defaultProps = {
  selectedItems: [],
};

function MenuItem(props) {
  const {
    classes,
    className: classNameProp,
    downShiftProps,
    index,
    item,
    selectedItems,  // eslint-disable-line no-unused-vars
    ...rest
  } = props;

  const { getItemProps, highlightedIndex, itemToString } = downShiftProps;

  const className = classnames(
    classes.menuItem,
    { [classes.highlighted]: highlightedIndex === index},
    classNameProp,
  );

  return (
    <Typography {...getItemProps({
      className,
      index,
      item,
      ...rest,
    })}>
      {itemToString(item)}
    </Typography>
  );
}

export default withStyles(styles)(MenuItem);
