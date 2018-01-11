import React, { Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

const getStyles = () => {
  return {
    listBottom: {
      display: 'block',
      lineHeight: '16px',
      padding: '8px 16px 8px 24px',
    },
  };
};

MenuBottom.propTypes = {
  menuBottomElement: PropTypes.element,
};

function MenuBottom (props) {
  const { menuBottomElement } =  props;
  const styles = getStyles();
  if (!menuBottomElement) {
    return null;
  }
  return (
    <Fragment>
      <Divider/>
      {cloneElement( menuBottomElement,
        {style: { ...styles.listBottom, ...menuBottomElement.props.style }}
      )}
    </Fragment>
  );
}

export default MenuBottom;
