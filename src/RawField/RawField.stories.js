import '../../stories/index.css';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RawField, Adornment, Adornments, Input } from '..';
import { PropToggler } from '../../stories/utils';

const toggleData = [
  {name: 'disabled', label: 'Disabled', initial: false},
  {name: 'hasErrorText', label: 'Error text', initial: false},
  {name: 'hasFloatingLabelText', label: 'Floating label', initial: false},
  {name: 'hasHintText', label: 'Hint text', initial: false},
  {name: 'multiLine', label: 'Multiline', initial: false},
  {name: 'hasPrefix', label: 'Prefix', initial: false},
  {name: 'hasSuffix', label: 'Suffix (fixed)', initial: false},
];

storiesOf('RawField', module)
  .add('with Adornments', () =>
    <PropToggler
      toggleData={toggleData}
      render={({state, toggles}) =>
        <div>
          <h4>
            Using the <code>RawField</code> component with <code>Input</code> and <code>Adornments</code> as children:
          </h4>
          <RawField
            name="rawfield"
            disabled={state.disabled}
            errorText={ state.hasErrorText ? 'Error text' : undefined}
            floatingLabelText={state.hasFloatingLabelText ? 'Floating Label' : undefined}
            hintText={state.hasHintText ? 'Hint...' : undefined}
            multiLine={state.multiLine}
            onBlur={action('onBlur')}
            onChange={action('onChange')}
            onFocus={action('onFoucs')}
          >
            <Adornments>
              {state.hasPrefix ? <Adornment>prefix</Adornment> : null}
            </Adornments>
            <Input/>
            <Adornments>
              {state.hasSuffix ?<Adornment fixed>suffix</Adornment> : null}
            </Adornments>
          </RawField>
          <div style={{width: '256px'}}>
            <h3>Prop settings</h3>
            {toggles}
          </div>
        </div>
      }
    />
  )
;
