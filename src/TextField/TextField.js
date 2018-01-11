import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Adornments, RawField, Input } from '..';
import { noop } from '../utils';

class TextField extends Component {
  static propTypes = {
    inputMinWidth: PropTypes.number,
    inputRef: PropTypes.func,
    multiLine: PropTypes.bool,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    typeAheadStyle: PropTypes.object,
    typeAheadText: PropTypes.node,
  }

  static defaultProps = {
    inputRef: noop,
    inputMinWidth: 6,
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  inputRef = input => {
    this.input = input;
    this.props.inputRef(input);
  };

  render() {
    const {
      typeAheadStyle,
      typeAheadText,
      inputMinWidth,
      prefix,
      suffix,
      multiLine,
      ...rest
    } = this.props;

    const renderAdornments = (adornments) => {
      return <Adornments>{adornments}</Adornments>;
    };

    if (!multiLine) {
      return (
        <RawField
          { ...rest }
          inputRef={this.inputRef}
          typeAheadStyle={typeAheadStyle}
          typeAheadText={typeAheadText}
        >
          {prefix && renderAdornments(prefix)}
          <Input
            inputMinWidth={inputMinWidth}
          />
          {suffix && renderAdornments(suffix)}
        </RawField>
      );
    } else {
      return <RawField {...rest} inputRef={this.inputRef} multiLine />;
    }
  }
}

export default TextField;
