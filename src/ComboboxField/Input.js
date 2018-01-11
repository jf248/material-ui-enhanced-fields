import React from 'react';
import PropTypes from 'prop-types';

import { Adornment, TextField } from '..';
import { noop } from '../utils';
import { Button, SelectedItem } from '.';

Input.propTypes = {
  disabled: PropTypes.bool,
  downShiftProps: PropTypes.shape({
    getInputProps: PropTypes.func.isRequired,
    itemToString: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
  }),
  multiple: PropTypes.bool,
  renderSelectedItem: PropTypes.func,
  selectedItemFocusIndex: PropTypes.number,
  selectedItems: PropTypes.array,
};

Input.defaultProps = {
  selectedItems: [],
};

function Input (props) {
  const {
    disabled,
    downShiftProps,
    multiple,
    renderSelectedItem,
    selectedItemFocusIndex,
    selectedItems,
    ...rest
  } = props;

  const { selectItem, itemToString } = downShiftProps;

  const getPrefix = () => {
    if (!multiple) {
      return undefined;
    } else {
      const newRenderSelectedItem = renderSelectedItem ||
        (props => React.createElement(SelectedItem, props));  // eslint-disable-line react/display-name
      return selectedItems.map((item, index) => {
        return (
          <Adornment key={itemToString(item)} fixed>
            {newRenderSelectedItem({
              hasFocus: index === selectedItemFocusIndex,
              item,
              itemToString,
              deselect: disabled ? noop : () => selectItem(item)
            })}
          </Adornment>
        );
      });
    }
  };

  const suffix = (
    <Button
      disabled={disabled}
      downShiftProps={downShiftProps}
      multiple={multiple}
    />
  );

  return (
    <TextField
      {...downShiftProps.getInputProps({
        disabled,
        prefix: getPrefix(),
        suffix,
        ...rest,
      })}
    />
  );
}

export default Input;
