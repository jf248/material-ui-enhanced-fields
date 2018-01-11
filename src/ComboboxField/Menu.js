import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Paper, Subheader } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { MenuBottom, MenuItem } from '.';

const getStyles = (props) => {
  const { muiTheme, width } = props;
  const { palette: { disabledColor }, zIndex } = muiTheme;
  return {
    paper: {
      position: 'absolute',
      width,
      zIndex: zIndex.popover,
    },
    listContainer: {
      maxHeight: '300px',
      overflowY: 'auto',
    },
    noMatch: {
      padding: '8px 16px 8px 24px',
      fontStyle: 'italic',
      color: disabledColor,
    },
  };
};

class Menu extends React.Component {
  static propTypes = {
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
    muiTheme: PropTypes.object,
    noMatchProps: PropTypes.object,
    noMatchText: PropTypes.node,
    renderMenuItem: PropTypes.func,
    selectedItems: PropTypes.any,
    style: PropTypes.object,
    SubheaderProps: PropTypes.object,
    width: PropTypes.number,
  }

  static defaultProps = {
    width: 256,
    noMatchProps: {},
    noMatchText: 'No matches...',
    menuBottomFixed: true,
    selectedItems: [],
  }

  render() {
    const {
      downShiftProps,
      groupedItems,
      menuBottomElement,
      menuBottomFixed,
      muiTheme,  // eslint-disable-line no-unused-vars
      noMatchProps,
      noMatchText,
      renderMenuItem,
      selectedItems,
      style,
      SubheaderProps,
      width,  // eslint-disable-line no-unused-vars
      ...rest
    } =  this.props;

    const { isOpen, itemToString } = downShiftProps;

    const styles = getStyles(this.props);

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
            {...noMatchProps}
            style={{ ...styles.noMatch, ...noMatchProps.style }}
          >
            {noMatchText}
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
                <Subheader {...SubheaderProps}>{group}</Subheader>
                {renderMenuItems(sublist)}
                {index < last && <Divider/>}
              </React.Fragment>
            );
          }
        );
      }
    };

    return (
      <div style={{postion: 'relative'}}>
        {isOpen && <Paper
          style={{ ...styles.paper }}
          zDepth={2}
          {...rest}
        >
          <div style={{ ...styles.listContainer, ...style }}>
            {renderSublists()}
            {!menuBottomFixed && <MenuBottom menuBottomElement={menuBottomElement}/> }
          </div>
          {menuBottomFixed && <MenuBottom menuBottomElement={menuBottomElement}/> }
        </Paper>
        }
      </div>
    );
  }
}

export default muiThemeable()(Menu);
