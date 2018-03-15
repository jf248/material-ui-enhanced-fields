import React from 'react';
import PropTypes from 'prop-types';
import { State } from '@jf248/react-powerplug';
import Downshift from 'downshift';
import { withStyles } from 'material-ui';
import classnames from 'classnames';

import { Input, Menu } from '.';
import {
  callAll,
  makeGroupReducer,
  makeFirstIndexReducer,
  wrapInArray,
} from '../utils';

const styles = () => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
  }
});

ComboboxField.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  defaultInputValue: PropTypes.string,
  defaultSelectedItem: PropTypes.any,
  filterFunc: PropTypes.func,
  groupField: PropTypes.string,
  items: PropTypes.array,
  itemToString: PropTypes.func,
  menuBottomElement: PropTypes.element,
  menuBottomFixed: PropTypes.bool,
  MenuProps: PropTypes.object,
  multiple: PropTypes.bool,
  noMatchProps: PropTypes.object,
  noMatchText: PropTypes.node,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderSelectedItem: PropTypes.func,
  selectedItem: PropTypes.any,
  style: PropTypes.object,
  SubheaderProps: PropTypes.object,
  TextFieldProps: PropTypes.object,
};

ComboboxField.defaultProps = {
  defaultInputValue: '',
  groupField: 'group',
  items: [],
  itemToString: function(item) { return item === null ? '' : item; },
  MenuProps: {},
  multiple: false,
  width: 256,
  menuBottomFixed: true,
  TextFieldProps: {},
};

function ComboboxField(props) {
  const {
    classes,   // eslint-disable-line no-unused-vars
    className: classNameProp,
    defaultInputValue,
    defaultSelectedItem,
    filterFunc,
    groupField,
    items,
    itemToString,
    menuBottomElement,
    menuBottomFixed,
    MenuProps,
    multiple,
    noMatchProps,
    noMatchText,
    onChange,
    onSelect,
    renderMenuItem,
    renderSelectedItem,
    selectedItem,
    style,
    SubheaderProps,
    TextFieldProps,
    ...rest
  } = props;

  const defaultFilterFunc = (items=[], query='') => (
    items.filter(
      item => itemToString(item).toLowerCase().includes(query.toLowerCase())
    )
  );

  const deleteSelectedItem = (arg) => {
    const { downShiftProps: { selectItem }, inputValue, selectedItemFocusIndex: index, selectedItem } = arg;
    if (!inputValue && index !== null) {
      selectItem(wrapInArray(selectedItem)[index]);
    }
  };

  const getFilteredItems = (items=[], query='', selectedItem) => {
    selectedItem = wrapInArray(selectedItem);
    items = filterFunc ? filterFunc(items, query) : defaultFilterFunc(items, query);
    return items.filter(item => !selectedItem.includes(item));
  };

  const getGroupedItems = (items=[]) => (
    items
      .reduce(...makeGroupReducer(groupField))
      .result
      .reduce(...makeFirstIndexReducer())
      .result
  );

  const getInitial = () => {
    let initialSelectedItem;
    let initialInputValue;
    if (selectedItem) {
      initialInputValue = multiple
        ? defaultInputValue
        : itemToString(selectedItem);
      initialSelectedItem = multiple ? wrapInArray(selectedItem) : selectedItem;
    } else {
      initialInputValue = defaultInputValue;
      if (defaultSelectedItem) {
        initialSelectedItem = multiple
          ? wrapInArray(defaultSelectedItem)
          : defaultSelectedItem;
      } else {
        initialSelectedItem = multiple ? [] : null;
      }
    }
    return {
      inputValue: initialInputValue,
      selectedItem: initialSelectedItem,
      selectedItemFocusIndex: null,
    };
  };

  const getItemsAndTypeAhead = ({
    highlightedIndex, inputValue, items, isOpen, selectedItem
  }) => {
    if (isOpen) {
      items = getFilteredItems(items, inputValue, selectedItem);
      const typeAhead = highlightedIndex === -1
        ? getTypeAhead(items, inputValue)
        : {};
      const groupedItems = getGroupedItems(items);
      return { groupedItems, typeAhead };
    } else {
      return { groupedItems: [], typeAhead: {} };
    }
  };

  const getTypeAhead = (items=[], inputValue='') => {
    let text;
    let typeAheadItem;
    const found = items.some(item => {
      typeAheadItem = item;
      text = itemToString(item).toLowerCase();
      return text.startsWith(inputValue.toLowerCase());
    });
    if (found && !!inputValue) {
      return {
        typeAheadText: inputValue + text.slice(inputValue.length),
        typeAheadItem,
      };
    } else {
      return {};
    }
  };

  const handleChange = ({selectedItem}) => {
    // We only want to expose changes to selectedItem, not the full state object
    // that includes typeAhead.
    selectedItem && onChange && onChange(selectedItem);
  };

  const handleKeyDown = props => event => {
    if (event.key && keyDownHandlers[event.key]) {
      keyDownHandlers[event.key](props);
      event.stopPropagation();
    }
  };

  const handleSelect = (setState) => (item) => {
    // The `Downshift` `selectedItem` and `inputValue` props are 'controlled'.
    // They're controlled by the `State` component. We use `State`'s `setState`
    // render prop to make changes.
    let newSelectedItem;
    let newInputValue;
    setState(({selectedItem: currentItems}) => {
      if (multiple) {
        currentItems = wrapInArray(currentItems);
        // Find the item in currentItems, if it's there.
        // It it isn't add it. If it is, remove it.
        newSelectedItem = currentItems.indexOf(item) === -1
          ? [...currentItems, item]
          : currentItems.filter(x => x !== item);
        newInputValue = '';
      } else {
        // Only one selectedItem allowed. Either remove or change/add.
        newSelectedItem = currentItems === item ? null : item;
        newInputValue = itemToString(newSelectedItem);
      }
      return { selectedItem: newSelectedItem, inputValue: newInputValue };
    });
  };

  const keyDownHandlers = {
    Enter(arg) {
      const { downShiftProps: { selectItem }, typeAheadItem } = arg;
      if (typeAheadItem) {
        selectItem(typeAheadItem);
      }
    },
    ArrowLeft(arg) {
      const { selectedItem, selectedItemFocusIndex: index, inputValue, setState } = arg;
      if (!inputValue) {
        const getNewIndex = () => {
          const last = wrapInArray(selectedItem).length - 1;
          return (index === null ? last : (index === 0 ? 0 : index -1));
        };
        setState({ selectedItemFocusIndex: getNewIndex()});
      }
    },
    ArrowRight(arg) {
      const { selectedItem, selectedItemFocusIndex: index, inputValue, setState } = arg;
      if (!inputValue) {
        const getNewIndex = () => {
          const last = wrapInArray(selectedItem).length - 1;
          return (index === null || index === last) ? null : index + 1;
        };
        setState({ selectedItemFocusIndex: getNewIndex()});
      }
    },
    Delete(arg) {
      deleteSelectedItem(arg);
    },
    Backspace(arg) {
      deleteSelectedItem(arg);
    },
  };

  const stateReducer = (selectedItem, setState) => (state, changes) => {
    const { inputValue, isOpen } = changes;

    if (isOpen === true) {
      setState({selectedItemFocusIndex: null});
    }

    // User has closed the menu (eg by clicking outside). Tidy the inputValue.
    if (isOpen === false) {
      if (multiple) {
        setState({inputValue: ''});
      } else {
        setState({
          inputValue: selectedItem ? itemToString(selectedItem) : ''
        });
      }
      return changes;
    }

    // User has changed the inputValue:
    // - update inputValue state, lowerCased
    // - remove highlightedIndex. We're using a typeAhead which may not
    // correspond to the first item which is otherwise highlighted by
    // Downshift
    if (inputValue !== undefined) {
      setState({
        inputValue: inputValue,
        selectedItemFocusIndex: null,
      });
      return {
        ...changes,
        highlightedIndex: -1,
      };
    }

    return changes;
  };

  const className = classnames(classNameProp, classes.root);

  return (
    <State
      key="state"
      initial={getInitial()}
      selectedItem={selectedItem}
      onChange={handleChange}
      render={({
        state: { inputValue, selectedItem, selectedItemFocusIndex },
        setState,
      }) => (
        <Downshift
          itemToString={itemToString}
          onSelect={callAll(handleSelect(setState), onSelect)}
          stateReducer={stateReducer(selectedItem, setState)}
          render={(downShiftProps) => {
            const { highlightedIndex, isOpen } = downShiftProps;
            const itemsAndTypeAhead = getItemsAndTypeAhead({
              highlightedIndex, inputValue, items, isOpen, selectedItem
            });
            const {
              groupedItems,
              typeAhead: {typeAheadItem, typeAheadText}
            } = itemsAndTypeAhead;
            return (
              <div
                className={className}
                style={style}
              >
                <Input
                  downShiftProps={downShiftProps}
                  multiple={multiple}
                  renderSelectedItem={renderSelectedItem}
                  typeAheadText={typeAheadText}
                  selectedItemFocusIndex={selectedItemFocusIndex}
                  selectedItems={wrapInArray(selectedItem)}
                  {...TextFieldProps}
                  onKeyDown={callAll(
                    handleKeyDown({
                      downShiftProps,
                      groupedItems,
                      inputValue,
                      setState,
                      selectedItem,
                      selectedItemFocusIndex,
                      typeAheadItem
                    }),
                    TextFieldProps.onKeyDown
                  )}
                />
                <Menu
                  downShiftProps={downShiftProps}
                  groupedItems={groupedItems}
                  menuBottomElement={menuBottomElement}
                  menuBottomFixed={menuBottomFixed}
                  MenuProps={MenuProps}
                  noMatchProps={noMatchProps}
                  noMatchText={noMatchText}
                  renderMenuItem={renderMenuItem}
                  selectedItems={wrapInArray(selectedItem)}
                  SubheaderProps={SubheaderProps}
                />
              </div>
            );
          }}
          { ...rest }
          inputValue={inputValue}
        />
      )}
    />
  );
}

export default withStyles(styles)(ComboboxField);
