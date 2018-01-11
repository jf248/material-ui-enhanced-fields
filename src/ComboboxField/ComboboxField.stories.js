import '../../stories/index.css';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { State } from '@jf248/react-powerplug';

import { ComboboxField } from '..';

const DATA = [
  {text: 'apple', group: 'fruits'},
  {text: 'banana', group: 'fruits'},
  {text: 'grapefruit', group: 'fruits'},
  {text: 'lemon', group: 'fruits'},
  {text: 'mango', group: 'fruits'},
  {text: 'orange', group: 'fruits'},
  {text: 'papaya', group: 'fruits'},
  {text: 'pear', group: 'fruits'},
  {text: 'pineapple', group: 'fruits'},
  {text: 'pomegranate', group: 'fruits'},
  {text: 'brocoli', group: 'vegetables'},
  {text: 'cabbage', group: 'vegetables'},
  {text: 'carrot', group: 'vegetables'},
  {text: 'cauliflower', group: 'vegetables'},
  {text: 'lettuce', group: 'vegetables'},
  {text: 'onion', group: 'vegetables'},
  {text: 'pea', group: 'vegetables'},
  {text: 'potato', group: 'vegetables'},
  {text: 'spinach', group: 'vegetables'},
  {text: 'tomato', group: 'vegetables'},
  {text: 'bread'},
  {text: 'eggs'},
  {text: 'lentils'},
  {text: 'milk'},
  {text: 'rice'},

];

const StoryComboxField = (props) => (
  <ComboboxField
    TextFieldProps={{
      floatingLabelText: 'Choose a food',
      hintText: 'Try typing "orange"...',
      name: 'combobox',
    }}
    items={DATA}
    menuBottomElement={
      <a onClick={action('Clicked on bottom element')} >
          Click here
      </a>
    }
    {...props}
    itemToString={item => item === null ? '' : item.text}
  />
);


storiesOf('ComboboxField', module)
  .add('basic', () =>
    <StoryComboxField/>
  )
  .add('basic (multiple)', () =>
    <StoryComboxField multiple/>
  )
  .add('controlled', () =>
    <State
      initial={{cSelectedItem: DATA[1]}}
      render={({state, setState}) =>
        <div>
          <StoryComboxField
            selectedItem={state.cSelectedItem}
            onChange={i => setState({cSelectedItem: i})}
            multiple
          />
          <StoryComboxField
            selectedItem={state.cSelectedItem}
            onChange={i => setState({cSelectedItem: i})}
            multiple
          />
        </div>
      }
    />
  );
