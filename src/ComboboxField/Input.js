import React from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import classnames from 'classnames';

import { noop } from '../utils';
import { InputWithTypeahead } from '..';
import { Button, SelectedItem } from '.';

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  downShiftProps: PropTypes.shape({
    getInputProps: PropTypes.func.isRequired,
    itemToString: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
  }),
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  multiple: PropTypes.bool,
  renderSelectedItem: PropTypes.func,
  selectedItemFocusIndex: PropTypes.number,
  selectedItems: PropTypes.array,
  typeAheadText: PropTypes.node,
};

Input.defaultProps = {
  selectedItems: [],
  inputProps: {},
  InputProps: {},
};

const styles = theme => ({  // eslint-disable-line no-unused-vars
  typeAheadRoot: {
    flex: '1000 1 6px',
  },
  Input: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
  withMarginBottom: {
    marginBottom: theme.spacing.unit,
  },
});

function Input (props) {
  const {
    classes,
    disabled,
    downShiftProps,
    inputProps: {
      typeAheadRootProps: { className: typeAheadRootClassName, typeAheadRootPropsProp } = {},
      ...inputPropsProp
    } = {},
    InputProps: InputPropsProp,
    multiple,
    renderSelectedItem: renderSelectedItemProp,
    selectedItemFocusIndex,
    selectedItems,
    typeAheadText,
    ...rest
  } = props;

  const { selectItem, itemToString } = downShiftProps;

  const renderSelectedItem = renderSelectedItemProp ||
    (props => React.createElement(SelectedItem, props));  // eslint-disable-line react/display-name

  const startAdornment = (
    multiple && selectedItems.length > 0
      ? (
        selectedItems.map((item, index) => renderSelectedItem({
          hasFocus: index === selectedItemFocusIndex,
          item,
          itemToString,
          deselect: disabled ? noop : () => selectItem(item),
          key: itemToString(item),
        }))
      )
      : null
  );

  const endAdornment = (
    <Button
      className={classnames({[classes.withMarginBottom]: withMargin})}
      disabled={disabled}
      downShiftProps={downShiftProps}
      multiple={multiple}
    />
  );

  const withMargin = (multiple && selectedItems && selectedItems.length > 0);

  const rootProps = {
    className: classnames(
      classes.typeAheadRoot,
      {[classes.withMarginBottom]: withMargin},
      typeAheadRootClassName
    ),
    ...typeAheadRootPropsProp,
  };

  const inputProps = { rootProps, typeAheadText, ...inputPropsProp };

  const InputProps = {
    startAdornment,
    endAdornment,
    inputComponent: InputWithTypeahead,
    ...InputPropsProp,
    className: classnames(classes.Input, InputPropsProp.className),
  };

  const InputLabelProps = {
    shrink: selectedItems.length > 0 || undefined,
  };

  return (
    <TextField
      {...downShiftProps.getInputProps({
        disabled,
        inputProps,
        InputProps,
        InputLabelProps,
        ...rest,
      })}
    />
  );
}

export default withStyles(styles)(Input);
