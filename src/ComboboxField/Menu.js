import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Typography, Divider, Paper, ListSubheader, withStyles } from 'material-ui';

import { MenuBottom, MenuItem } from '.';

const styles = theme => ({
  paper: {
    zIndex: theme.zIndex.modal,
  },
  listContainer: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 32px)',
    backgroundColor: 'inherit',
  },
  noMatch: {
    padding: '8px 16px 8px 24px',
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
  },
});

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  downShiftProps: PropTypes.shape({
    isOpen: PropTypes.bool,
    itemToString: PropTypes.func.isRequired,
    getItemProps: PropTypes.func.isRequired,
    highlightedIndex: PropTypes.number,
    selectedItem: PropTypes.any,
  }).isRequired,
  groupedItems: PropTypes.array.isRequired,
  menuBottomElement: PropTypes.element,
  menuBottomFixed: PropTypes.bool,
  MenuProps: PropTypes.object,
  noMatchProps: PropTypes.object,
  noMatchText: PropTypes.node,
  renderMenuItem: PropTypes.func,
  selectedItems: PropTypes.any,
  SubheaderProps: PropTypes.object,
};

Menu.defaultProps = {
  noMatchProps: {},
  noMatchText: 'No matches...',
  menuBottomFixed: true,
  MenuProps: {},
  selectedItems: [],
};

function Menu(props) {
  const {
    classes,
    downShiftProps,
    groupedItems,
    menuBottomElement,
    menuBottomFixed,
    MenuProps: {className: MenuClassName, ...MenuPropsProp},
    noMatchProps: {className: noMatchClassName, ...noMatchPropsProp},
    noMatchText,
    renderMenuItem,
    selectedItems,
    SubheaderProps,
  } =  props;

  const { isOpen, itemToString } = downShiftProps;

  const renderMenuItems = (sublist) => sublist.items.map(
    (item, indexOfSublist) => {
      const index = sublist.firstIndex + indexOfSublist;
      const renderFunc = renderMenuItem ||
        (props => React.createElement(MenuItem, props));  // eslint-disable-line react/display-name
      return renderFunc({
        downShiftProps,
        index,
        item,
        key: itemToString(item),
        selectedItems,
      });
    }
  );

  const renderSublists = () => {
    const last = groupedItems.length - 1;
    if (groupedItems.length === 0) {
      return (
        <div
          className={classnames(classes.noMatch, noMatchClassName)}
          {...noMatchPropsProp}
        >
          <Typography color={'inherit'}>{noMatchText}</Typography>
        </div>
      );
    } else {
      return groupedItems.map(
        (sublist, index) => {
          const group = sublist.group;
          return (
            <React.Fragment
              key={group || 'single-sublist'}
            >
              <ListSubheader {...SubheaderProps}>{group}</ListSubheader>
              {renderMenuItems(sublist)}
              {index < last && <Divider/>}
            </React.Fragment>
          );
        }
      );
    }
  };

  if (isOpen) {
    return (
      <Paper className={classes.paper} >
        <div
          className={classnames(classes.listContainer, MenuClassName)}
          {...MenuPropsProp}
        >
          {renderSublists()}
          {!menuBottomFixed && <MenuBottom menuBottomElement={menuBottomElement}/> }
        </div>
        {menuBottomFixed && <MenuBottom menuBottomElement={menuBottomElement}/> }
      </Paper>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(Menu);
