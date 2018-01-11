import React from 'react';
import PropTypes from 'prop-types';

Adornments.propTypes = {
  isPrefix: PropTypes.bool,
  showAdornments: PropTypes.bool,
};

function Adornments({ children, isPrefix, showAdornments, ...rest }) {
  return children
    ? React.Children.map(
      children,
      child => React.cloneElement(child, { isPrefix, showAdornment: showAdornments, ...rest })
    )
    : null;
}

export default Adornments;
