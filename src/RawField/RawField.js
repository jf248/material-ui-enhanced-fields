import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from 'material-ui';
import { Compose, Focus, State } from '@jf248/react-powerplug';

import { RawFieldChild } from '.';
import { isValid, noop } from '../utils';

const getStyles = (props) => {  // eslint-disable-line no-unused-vars
  return {
    underline: {
      position: 'relative',
      bottom: null,
    },
    error: {
      position: 'relative',
      top: 8,
      bottom: null,
    },
    textField: {
      height: null, // Override height set by material-ui
    },
  };
};

RawField.propTypes = {
  /*
   * Style of the background text. Used by the Input component.
   */
  typeAheadStyle: PropTypes.object,
  /*
   * Background text. Used by the Input component.
   */
  typeAheadText: PropTypes.node,
  /*
   * Ref to be passed to the input DOM node.
   */
  inputRef: PropTypes.func,

  /**
   * material-ui TextField props:
   */
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  errorStyle: PropTypes.object,
  errorText: PropTypes.node,
  floatingLabelFixed: PropTypes.bool,
  floatingLabelFocusStyle: PropTypes.object,
  floatingLabelShrinkStyle: PropTypes.object,
  floatingLabelStyle: PropTypes.object,
  floatingLabelText: PropTypes.node,
  fullWidth: PropTypes.bool,
  hintStyle: PropTypes.object,
  hintText: PropTypes.node,
  id: PropTypes.string,
  inputStyle: PropTypes.object,
  multiLine: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  style: PropTypes.object,
  textareaStyle: PropTypes.object,
  type: PropTypes.string,
  underlineDisabledStyle: PropTypes.object,
  underlineFocusStyle: PropTypes.object,
  underlineShow: PropTypes.bool,
  underlineStyle: PropTypes.object,
  value: PropTypes.any,
};

RawField.defaultProps = {
  inputRef: noop,

  // Same as material-ui TextField
  disabled: false,
  floatingLabelFixed: false,
  multiLine: false,
  fullWidth: false,
  type: 'text',
  underlineShow: true,
  rows: 1,
};

function RawField(props) {
  const {
    /* Remove the non-standard props for multiLine=true scenario. */
    typeAheadStyle,
    typeAheadText,
    inputRef,
    children,
    ...standardProps
  } = props;

  const {
    /*
     * Don't supply MuiTextField with these props. RawFieldChild will use these
     * instead.
     */
    hintStyle,
    hintText,
    ...parentProps
  } = standardProps;

  const {
    className,  // eslint-disable-line no-unused-vars
    defaultValue,  // eslint-disable-line no-unused-vars
    disabled,  // eslint-disable-line no-unused-vars
    errorStyle,
    errorText,  // eslint-disable-line no-unused-vars
    floatingLabelFixed,  // eslint-disable-line no-unused-vars
    floatingLabelFocusStyle,  // eslint-disable-line no-unused-vars
    floatingLabelShrinkStyle,  // eslint-disable-line no-unused-vars
    floatingLabelStyle,  // eslint-disable-line no-unused-vars
    floatingLabelText,  // eslint-disable-line no-unused-vars
    fullWidth,  // eslint-disable-line no-unused-vars
    id,  // eslint-disable-line no-unused-vars
    inputStyle,
    multiLine,
    name,  // eslint-disable-line no-unused-vars
    onBlur,  // eslint-disable-line no-unused-vars
    onChange,  // eslint-disable-line no-unused-vars
    onFocus,  // eslint-disable-line no-unused-vars
    rows,  // eslint-disable-line no-unused-vars
    rowsMax,  // eslint-disable-line no-unused-vars
    style,
    textareaStyle,  // eslint-disable-line no-unused-vars
    type,
    underlineDisabledStyle,
    underlineFocusStyle,
    underlineShow,
    underlineStyle,
    value,
    ...rest
  } = parentProps;

  const styles = getStyles(props);
  const hasLabel = floatingLabelText ? true : false;
  const hasError = errorText ? true: false;

  const renderFunc = ({
    focus, focused, setState, state: { hasValue }, getFocusProps  // eslint-disable-line react/prop-types
  }) => {

    const getInputProps = () => {
      const showTypeAhead = (focused && (valueCheck() || !hintText));
      const showHint = (!valueCheck() && (floatingLabelFixed || focused || !floatingLabelText));
      const setHasValue = e => setState({hasValue: isValid(e.target.value)});
      return getFocusProps({
        typeAheadStyle,
        typeAheadText: showTypeAhead && typeAheadText,
        focus,
        hintStyle,
        hintText: showHint && hintText,
        inputStyle,
        onFocus: setHasValue,
        onBlur: setHasValue,
        onChange: setHasValue,
        type,
        value,
      });
    };

    const getAdornmentsProps = () => {
      const showAdornments = (focused || valueCheck() || floatingLabelFixed);
      return {
        showAdornments,
      };
    };

    // Check whether the input has a value.
    // In uncontrolled mode, value is undefined, so instead we check
    // state.hasValue which is toggled by the onBlur and onChange events in
    // getInputProps.
    // In controlled mode we check that the value is valid.
    const valueCheck = () => {
      if (value === undefined) {
        return hasValue || undefined;
      } else {
        return isValid(value) || undefined;
      }
    };

    if (!multiLine) {
      return (
        <MuiTextField
          { ...parentProps }
          errorStyle={{ ...styles.error, ...errorStyle }}
          style={{...styles.textField, ...style}}
          underlineShow={false}
        >
          {/**
            * Note RawFieldChild's value prop. Material-ui's TextField checks
            * children.props.value to set its own state.hasValue. So, in
            * uncontrolled mode we need RawFieldChild's value prop to reflect
            * the state.hasValue in this component. The actual value (for use in
            * controlled mode) is passed to RawFieldChild as part of the
            * inputProps prop.
            *
            * RawFieldChild is also passed the following props by material-ui's
            * TextField:
            *   id, disabled, onChange, onBlur, onFocus, ref and style (which is
            *   a merge of TextField's default style for the input element and
            *   inputStyle)
            **/}
          <RawFieldChild
            {...rest}
            adornmentsProps={getAdornmentsProps()}
            errorStyle={errorStyle}
            hasError={hasError}
            hasFocus={focused}
            hasLabel={hasLabel}
            inputProps={getInputProps()}
            underlineDisabledStyle={underlineDisabledStyle}
            underlineFocusStyle={underlineFocusStyle}
            underlineShow={underlineShow}
            underlineStyle={underlineStyle}
            value={valueCheck()}
          >
            {children}
          </RawFieldChild>
        </MuiTextField>
      );
    } else {
      return (
        // For multiLine, pass all props to MuiTextField
        <MuiTextField
          { ...getFocusProps({ ...standardProps }) }
        />
      );
    }
  };

  return (
    <Compose
      states={[
        <Focus key="focus" focusProps={{ref: inputRef}} />,
        <State key="state" initial={{
          hasValue: isValid(value) || isValid(defaultValue),
        }}/>,
      ]}
      render={renderFunc}
    />
  );
}

export default RawField;
