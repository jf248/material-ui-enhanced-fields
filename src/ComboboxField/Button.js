import React from 'react';
import PropTypes from 'prop-types';

import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Close from 'material-ui/svg-icons/navigation/close';
import { ButtonAdornment } from '..';

ComboboxButton.propTypes = {
  disabled: PropTypes.bool,
  downShiftProps: PropTypes.shape({
    clearSelection: PropTypes.func.isRequired,
    inputValue: PropTypes.string,
    isOpen: PropTypes.bool,
    toggleMenu: PropTypes.func.isRequired,
  }).isRequired,
  multiple: PropTypes.bool,
};

function ComboboxButton (props) {
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
      : <ButtonAdornment onClick={handleClick} icon={<Icon/>} />
  );
}

export default ComboboxButton;
