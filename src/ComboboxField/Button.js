import React from 'react';
import PropTypes from 'prop-types';
import ArrowDown from 'material-ui-icons/ArrowDropDown';
import ArrowUp from 'material-ui-icons/ArrowDropUp';
import Close from 'material-ui-icons/Close';
import { InputAdornment } from 'material-ui';

Button.propTypes = {
  disabled: PropTypes.bool,
  downShiftProps: PropTypes.shape({
    clearSelection: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
    isOpen: PropTypes.bool,
    toggleMenu: PropTypes.func.isRequired,
  }).isRequired,
  multiple: PropTypes.bool,
};

function Button (props) {
  const {
    disabled,
    downShiftProps: { clearSelection, inputValue, isOpen, toggleMenu },
    multiple,
  } = props;

  const Icon = (isOpen
    ? ArrowUp
    : ((inputValue && !multiple) ? Close : ArrowDown)
  );

  const handleClick = () => {
    if (!isOpen && !!inputValue) {
      clearSelection();
    } else {
      toggleMenu();
    }
  };

  return (
    disabled
      ? null
      : (
        <InputAdornment poisition="end" onClick={handleClick}><Icon/></InputAdornment>
      )
  );
}

export default Button;
