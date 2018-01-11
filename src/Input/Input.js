import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextFieldHint from 'material-ui/TextField/TextFieldHint';

const getStyles = (props) => {
  const {
    textField: {
      textColor,
      disabledTextColor,
    }
  } = props.muiTheme;

  return {
    hint: {
      top: 0,
      left: 0,
      bottom: null, // Override TextFieldHint style
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
    },
    wrapper: {
      position: 'relative',
      flex: `100 0 ${props.inputMinWidth}px`,
      marginTop: 0,
      minHeight: 24,
    },
    input: {
      marginTop: 0,
      backgroundColor: 'transparent',

      // These are from the styles.input of material-ui's TextField
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      //backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      cursor: 'inherit',
      font: 'inherit',
      WebkitOpacity: 1,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
    },
  };
};

Input.propTypes = {
  disabled: PropTypes.bool,
  focus: PropTypes.func,
  hintStyle: PropTypes.object,
  hintText: PropTypes.node,
  id: PropTypes.string,
  inputMinWidth: PropTypes.number,
  inputRef: PropTypes.func,
  inputStyle: PropTypes.object,
  muiTheme: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  typeAheadStyle: PropTypes.object,
  typeAheadText: PropTypes.node,
  value: PropTypes.any,
};

Input.defaultProps = {
  inputMinWidth: 6,
};

function Input(props) {
  const styles = getStyles(props);

  const {
    typeAheadStyle,
    typeAheadText,
    disabled,
    focus,
    hintStyle,
    hintText,
    id,
    inputMinWidth,   // eslint-disable-line no-unused-vars
    inputRef,
    inputStyle,
    muiTheme,
    onBlur,
    onChange,
    onFocus,
    style,
    type,
    value,
    ...rest
  } = props;

  return (
    <div
      style={{ ...style, ...styles.wrapper}}
      onClick={focus}
    >
      <TextFieldHint
        muiTheme={muiTheme}
        show={!!typeAheadText}
        style={{ ...styles.hint, ...typeAheadStyle }}
        text={typeAheadText}
      />
      <input
        disabled={disabled}
        id={id}
        ref={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type={type}
        value={value}
        {...rest}
        style={{ ...styles.input, ...inputStyle }}
      />
      <TextFieldHint
        muiTheme={muiTheme}
        show={!!hintText}
        style={{ ...styles.hint, ...hintStyle }}
        text={hintText}
      />
    </div>
  );
}

export default muiThemeable()(Input);
