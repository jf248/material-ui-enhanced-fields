import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';

const getStyles = (props) => {
  const { index, item, downShiftProps, muiTheme, selectedItems } = props;
  const { highlightedIndex } = downShiftProps;
  const { palette: { accent1Color, disabledColor } } = muiTheme;
  const color = selectedItems.includes(item) && accent1Color;
  return {
    menuItem: {
      padding: '4px 16px 4px 24px',
      backgroundColor: highlightedIndex === index && disabledColor,
      color,
    },
  };
};

MenuItem.propTypes = {
  downShiftProps: PropTypes.shape({
    getItemProps: PropTypes.func.isRequired,
    highlightedIndex: PropTypes.number,
    selectedItem: PropTypes.any,
  }).isRequired,
  index: PropTypes.number,
  item: PropTypes.any.isRequired,
  muiTheme: PropTypes.object.isRequired,
  selectedItems: PropTypes.array,
  style: PropTypes.object,
};

MenuItem.defaultProps = {
  selectedItems: [],
};

function MenuItem(props) {
  const styles = getStyles(props);
  const {
    downShiftProps,
    index,
    item,
    muiTheme,  // eslint-disable-line no-unused-vars
    selectedItems,   // eslint-disable-line no-unused-vars
    style,
    ...rest
  } = props;
  const { getItemProps, itemToString } = downShiftProps;

  return (
    <div {...getItemProps({
      index,
      item,
      ...rest,
      style: { ...styles.menuItem, ...style},
    })}>
      {itemToString(item)}
    </div>
  );
}

export default muiThemeable()(MenuItem);
