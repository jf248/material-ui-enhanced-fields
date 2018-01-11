import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { Adornment } from '.';

const getStyles = props => {
  const {
    muiTheme: {
      palette: {
        textColor,
        secondaryTextColor,
      }
    }
  } = props;

  return {
    button: { padding: '0px 0px 0px 0px', width: 24, height: 24},
    icon: { color: secondaryTextColor, hoverColor: textColor },
  };
};

ButtonAdornment.propTypes = {
  icon: PropTypes.element.isRequired,
  muiTheme: PropTypes.object.isRequired,
  iconButtonProps: PropTypes.object,
  onClick: PropTypes.func,
};

ButtonAdornment.defaultProps = {
  fixed: true,
  iconButtonProps: {},
};

function ButtonAdornment(props) {
  const { icon, iconButtonProps, muiTheme, onClick, ...rest } = props;  // eslint-disable-line no-unused-vars
  const styles = getStyles(props);

  const newIcon = React.cloneElement(
    icon,
    {
      color: icon.props.color || styles.icon.color,
      hoverColor: icon.props.hovercolor || styles.icon.hoverColor,
    }
  );

  return (
    <Adornment style={{height: 24}} {...rest}>
      <IconButton
        {...iconButtonProps}
        onClick={onClick}
        style={{...styles.button, ...iconButtonProps.style}}
      >
        {newIcon}
      </IconButton>
    </Adornment>
  );
}

export default muiThemeable()(ButtonAdornment);
