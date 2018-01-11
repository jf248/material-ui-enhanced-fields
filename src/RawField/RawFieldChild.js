import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { callAll, wrapInArray } from '../utils';
import Underline from './Underline';
import { Input, Adornments } from '..';

const getStyles = (props) => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexFlow: 'row wrap',
      marginTop: props.hasLabel ? 38 : 12,
    },
  };
};

// Must be a class since it's supplied a ref by material-ui's TextField
class RawFieldChild extends Component {
  static propTypes = {
    adornmentsProps: PropTypes.shape({
      showAdornments: PropTypes.bool,
    }).isRequired,
    children: PropTypes.node.isRequired,
    errorStyle: PropTypes.object,
    hasLabel: PropTypes.bool.isRequired,
    hasFocus: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    inputProps: PropTypes.shape({
      // props from react-powerplug Focus
      ref: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,

      typeAheadStyle: PropTypes.object,
      typeAheadText: PropTypes.node,
      focus: PropTypes.func,
      hintStyle: PropTypes.object,
      hintText: PropTypes.node,
      inputStyle: PropTypes.object,
      type: PropTypes.string,
      value: PropTypes.any,
    }).isRequired,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineShow: PropTypes.bool,
    underlineStyle: PropTypes.object,
    value: PropTypes.bool,

    /*
     * These props are inserted by material-ui's TextField:
     */
    disabled: PropTypes.bool,
    id: PropTypes.any,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    ref: PropTypes.any,
    style: PropTypes.object,
  }

  render() {
    const styles = getStyles(this.props);

    const {
      adornmentsProps,
      children,
      disabled,
      hasError,
      hasFocus,
      hasLabel,
      inputProps,
      id,
      onChange,
      onBlur,
      onFocus,
      ref,  // eslint-disable-line no-unused-vars
      style,   // eslint-disable-line no-unused-vars
      underlineShow,
      underlineStyle,
      underlineFocusStyle,
      underlineDisabledStyle,
      errorStyle,
      value,   // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    /*
     * Create new inputProps that will be passed to the Input component.
     * Override the inputProps.ref as undefined and pass it as inputRef instead,
     * as we don't want to call the ref for the Input node but on the underlying
     * input DOM node.
     * For onBlur, onChange and onFocus compose the functions passed as props to
     * RawFieldChild (created by material-ui's TextField) and the functions
     * passed in the inputProps prop object which were created by RawField.
     */
    const newInputProps = {
      ...inputProps,
      disabled,
      id,
      inputRef: inputProps.ref,
      onBlur: callAll(onBlur, inputProps.onBlur),
      onChange: callAll(onChange, inputProps.onChange),
      onFocus: callAll(onFocus, inputProps.onFocus),
      ref: undefined,
    };

    // Clone children adding props depending on type
    const newChildren = React.Children.map(
      wrapInArray(children).filter(x => !!x),
      (child, index) => {
        if (child.type === Input) {
          return React.cloneElement(child, { ...rest, ...newInputProps });
        } else if (child.type === Adornments) {
          return React.cloneElement(
            child, { ...rest, ...adornmentsProps, isPrefix: index === 0 }
          );
        } else {
          return React.cloneElement(child, { ...rest });
        }

      }
    );

    return (
      <div>
        <div style={{ ...styles.wrapper}}>
          {newChildren}
        </div>
        {underlineShow ?
          <Underline
            disabled={disabled}
            disabledStyle={underlineDisabledStyle}
            error={hasError}
            errorStyle={errorStyle}
            focus={hasFocus}
            focusStyle={underlineFocusStyle}
            style={underlineStyle}
            hasLabel={hasLabel}
          /> :
          null
        }
      </div>
    );
  }
}

export default RawFieldChild;
