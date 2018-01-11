import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';

const getStyles = props => {
  const { isPrefix, muiTheme: { textField: { hintColor } } } = props;
  return {
    adornment: {
      color: hintColor,
      flex: isPrefix ? 'none' : 'auto',
      whiteSpace: 'nowrap',
      // Remove any width inhereted from EnhancedTextField parent
      width: null,
      marginRight: isPrefix ? 4 : 0,
      marginLeft: isPrefix ? 0 : 4,
      textAlign: !isPrefix && 'right',
    },
  };
};

Adornment.propTypes = {
  children: PropTypes.node,
  /**
   * Used by TextFieldChild to display the adornment even if displayFixes is
   * false.
   */
  fixed: PropTypes.bool,
  /**
   * Adornments is positioned as a prefix
   */
  isPrefix: PropTypes.bool,
  /**
   * Theme provided by muiThemeable HOC
   */
  muiTheme: PropTypes.object,
  showAdornment: PropTypes.bool,
  /**
   * Overrider the inline-style of the root element.
   */
  style: PropTypes.object,
};

Adornment.defaultProps = {
  fixed: false,
};

function Adornment (props) {
  const {
    children,
    fixed,
    showAdornment,
    style,
    muiTheme, // eslint-disable-line no-unused-vars
    isPrefix, // eslint-disable-line no-unused-vars
    ...rest
  } = props;
  const styles = getStyles(props);
  return (
    (fixed || showAdornment)
      ? <div style={{ ...styles.adornment, ...style}} { ...rest }>
        {children}
      </div>
      : null
  );
}

export default muiThemeable()(Adornment);
