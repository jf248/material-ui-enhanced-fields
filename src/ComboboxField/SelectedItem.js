import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';
import {blue300} from 'material-ui/styles/colors';

const getStyles = props => {  // eslint-disable-line no-unused-vars
  return {
    chip: {
      margin: '2px 0px',
    },
  };
};

SelectedItem.propTypes = {
  deselect: PropTypes.func.isRequired,
  hasFocus: PropTypes.bool,
  item: PropTypes.any.isRequired,
  itemToString: PropTypes.func.isRequired,
  style: PropTypes.object,
};

function SelectedItem(props) {
  const {
    deselect,
    hasFocus,  // eslint-disable-line no-unused-vars
    item,
    itemToString,
    style,
    ...rest
  } = props;
  const styles = getStyles(props);
  return (
    <Chip
      backgroundColor={hasFocus ? blue300 : undefined}
      onRequestDelete={deselect}
      style={{...styles.chip, ...style}}
      {...rest}
    >
      {itemToString(item)}
    </Chip>
  );
}

export default SelectedItem;
