# material-ui-enhanced-fields

A collection of enhanced fields for use with [material-ui](material-ui) (v0).

- A [TextField](#TextField) alternative to `material-ui`'s that also has customisable prefixes, suffixes and typeahead.
- A [ComboboxField](#ComboboxField).

![demo2.gif](demo2.gif)

See [storybook][storybook] for live demos.

## Install
```
yarn add material-ui-enhanced-fields
```
```
npm i material-ui-enhanced-fields
```

## Main Components
- [TextField](#TextField)
- [ComboboxField](#ComboboxField)

### TextField
Like `material-ui`'s `TextField` but can be given optional prefix, suffix and typeahead.

Background text can be used for 'typeahead' implementations. See [storybook][storybook].

#### Basic Example
```jsx
<TextField
  name="foo"
  floatingLabelText="Foo"
  prefix={[
    <Adornment key="prefix_1">prefix 1</Adornment>,
    <Adornment key="prefix_2">prefix 2</Adornment>
  ]}
  suffix={<Adornment><ArrowDown/><Adornment>}
  typeAheadText={typeAheadText}
/>
```

#### Props
prop | type | default | description
--- | --- | --- | ---
`inputMinWidth` | `number` | `6` | The minimum width of the DOM `<input/>` element.  (The `<input/>` will shrink if there are prefixes or suffixes.)
`inputRef` | `function` | `() => {}` | A ref callback for the DOM `<input/>` element.
`prefix` | `<Adornment/>` or `array(<Adornment/>)` || The prefix `Adornment`. See example.
`suffix` | `<Adornment/>` or `array(<Adornment/>)` || The suffix `Adornment`. See example.
`typeAheadStyle` | `Object` || Style of the typeahead text.
`typeAheadText` | `string` || The typeahead text.  This text will appear directly under the `<input/>`'s value.

> Also takes all the props of `material-ui`'s `TextField`.

### ComboboxField
A customisable 'combobox' field that allows both text input and selection from a drop-down menu.
With `multiple` set to `false` (default) the selected value is displayed as text in the `<input/>` element.
With `multiple` set to `true` selectedItems are stored in a prefix. The default rendering is `Chip`'s.
Items can be grouped into sublist by supplying the a `groupField` prop (default is 'group').
Based on the [Downshift](Downshift) library.

#### Basic Examples
```jsx
const DATA = ['apples', 'oranges'];

<ComboboxField
  items={DATA}
  TextFieldProps={{ floatingLabelText: 'Pick a food' }}
/>
```

```jsx
const DATA = [{text: 'apple', type: 'fruit'}, {text: 'tomato', type: 'veg'}];
<ComboboxField
  items={DATA}
  itemToString={item => item === null ? '' : item.text}
  groupField={'type'}
  TextFieldProps={{ floatingLabelText: 'Pick a food' }}
/>
```

#### Props
prop | type | default | description
--- | --- | --- | ---
`filterFunc` | `function(items: Array, query: string)` | |  Override the default function for filtering the items based on the field's input value.
`items` | `Array` | `[]` | The array of possible items to select.
`groupField` | `string` | `'group'` | The name of the key to group each item object by. (Optional, if items aren't objects or don't have a field to group by, they won't be grouped.)
`menuBottomElement` | `Object` || An element to display at the bottom of the menu.
`menuBottomFixed` | `boolean` | `true` | Fix the `menuBottom` element so it's reachable without scrolling.
`MenuProps` | `Object` || Props to be merged into the `Menu` component.
`multiple` | `boolean` | `false` | Allow multiple selected items.
`noMatchProps` | `Object` || Props to be merged to the component displayed when there are no matched items.
`noMatchText` | `node` || Text to be displayed if there are no matched items to display in the menu.
`renderMenuItem` | `function({downShiftProps: {}, index: number, item: any, key: string, selectedItems: Array})` || Override the default rendering of each menu item. Should return an element that employ's the Downshift getItemProps 'prop getter' function.  See source code and [Downshift](Downshift).
`renderSelectedItem` | `function({deselect: function, hasFocus: boolean, item: any, itemToString: function})` || Override the default rendering (uses `Chip`s) of each selected item. (Only applies when the `multiple` is `true`.)   `deselect`: A callback that will deselect the item. `hasFocus`: True if item has been focused with keyboard.  `item`: The item to render.  `itemToString`: The `itemToString` prop supplied for convenience.
`style` | `Object` || Override the style of the root element.
`SubheaderProps` | `Object` || Props to be merged ino each `Subheader`.
`TextFieldProps` | `Object` || Props for the `TextField` component.
`width` | `number` | `256` | The width of the component.
> In addtion, you can pass all the props of the `Downshift` component, except the `inputValue`. [See here.](Downshift)

## Other Components
- [RawField](#TextField)
- [Input](#Input)
- [Adornments](#Adornments)
- [Adornment](#Adornment)
- [ButtonAdornment](#ButtonAdornment)

### RawField
An alternative to using [TextField](#TextField). Takes [Adornments](#Adornments) and [Input](#Input) as `children`. See example.
> `TextField` is implemented with `Rawfield`.

#### Basic Example
```jsx
<RawField name='foo'>
  <Adornments>
    <Adornment>prefix</Adornment>
  </Adornments>
  <Input/>
  <Adornments>
    <Adornment>suffix</Adornment>
  </Adornments>
</RawField>
```

#### Props
prop | type | default | description
--- | --- | --- | ---
`inputRef` | `function` | `() => {}` | A ref callback for the DOM `<input/>` element.
`typeAheadStyle` | `Object` || Style of the typeahead text.
`typeAheadText` | `string` || The typeahead text.

> Also takes all the props of `material-ui`'s `TextField`.

### Input
A wrapper round an `<input/>` element, used as a child of `RawField`.

#### Props
prop | type | default | description
--- | --- | --- | ---
`disabled` | `boolean` || The `disabled` prop for the `<input/>`.
`focus` | `function` || A callback that causes the `<input/>` to gain focus.
`hintStyle` | `Object` || Override the inline style for the `hintText` element.
`hintText` | `string` || The hint content to display.
`id` | `string` || The `id` prop for the `<input/>`.
`inputMinWidth` | `number` | 6 | The minimum width of the `<input/>` element.
`inputRef` | `function` || The `ref` prop for the `<input/>` element.
`inputStyle` | `Object` || Override the inline style of the `<input/>` element.
`onBlur` | `function` || Callback function fired when the `<input/>` blurs.
`onChange` | `function` || Callback function fired when the `<input/>` value changes.
`onFocus` | `function` || Callback function fired when the `<input/>` gains focus.
`style` | `Object` || Override the style of the root element.
`type` | `string` || The `type` prop for the `<input/>` element.
`typeAheadStyle` | `Object` || Override the inline style for the `typeAheadText` element.
`typeAheadText` | `node` || The typeahead content to display.
`value` | `any` || The `value` prop for the `<input/>` element.

### Adornments
Used as a child of `RawField` as a parent of `Adornment` elements.

#### Props
prop | type | default | description
--- | --- | --- | ---
`isPrefix` | `boolean` || The `Adornments` is a prefix.
`showAdornments` | `boolean` || Display the `Adornments`.
> These props are automatically populated if `Adornments` is a child of `RawField`.

### Adronment
Used as a child of `Adornments`. A wrapper around the actual adornment node.

#### Props
prop | type | default | description
--- | --- | --- | ---
`fixed` | `boolean` || The `Adornment` is fixed: it will always be displayed.
`isPrefix` | `boolean` || The `Adornment` is a prefix.
`showAdornment` | `boolean` || Display the `Adornment`.
`style` | `boolean` || Override the inline style of the root element.
> `isPrefix` and `showAdornment` are automatically populated if a child of `Adornments`.

### ButtonAdornment
An `Adornment` with that uses a `material-ui` `IconButton`.

#### Basic Example
```jsx
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';

<RawField>
  <Input/>
  <Adornments>
    <ButtonAdornment icon={<DownArrow/>} onClick={handleClick}/>
  </Adornments>
</RawField>
```

#### Props
prop | type | default | description
--- | --- | --- | ---
`icon` | `element` || The icon element.
`iconButtonProps` | `Object` || Props to merge into the `IconButton`.
`onClick` | `function` || Callback function for when the `ButtonAdornment` is clicked.
> Also takes all the props of `Adornment`.

[storybook]: https://jf248.github.io/material-ui-enhanced-fields/
[Downshift]: https://github.com/paypal/downshift
[Downshift-RenderPropFunction]: https://github.com/paypal/downshift#render-prop-function
[material-ui]: https://github.com/mui-org/material-ui
