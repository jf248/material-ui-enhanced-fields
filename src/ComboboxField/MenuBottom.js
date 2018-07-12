import React, { Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Divider, withStyles } from '@material-ui/core';
import classnames from 'classnames';

const styles = () => ({
  listBottom: {
    display: 'block',
    lineHeight: '16px',
    padding: '8px 16px 8px 24px',
  },
});

MenuBottom.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  menuBottomElement: PropTypes.element,
};

function MenuBottom (props) {
  const { classes, className, menuBottomElement } =  props;
  if (!menuBottomElement) {
    return null;
  }
  return (
    <Fragment>
      <Divider/>
      {cloneElement( menuBottomElement,
        {className: classnames(classes.listBottom, className)}
      )}
    </Fragment>
  );
}

export default withStyles(styles)(MenuBottom);
