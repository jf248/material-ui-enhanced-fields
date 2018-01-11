import '../../stories/index.css';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TextField as MuiTextField } from 'material-ui';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { Focus } from '@jf248/react-powerplug';

import { PropToggler } from '../../stories/utils';
import { Adornment, TextField, ButtonAdornment } from '..';

const toggleData = [
  {name: 'disabled', label: 'Disabled', initial: false},
  {name: 'hasErrorText', label: 'Error text', initial: false},
  {name: 'hasFloatingLabelText', label: 'Floating label', initial: false},
  {name: 'hasHintText', label: 'Hint text', initial: false},
  {name: 'multiLine', label: 'Multiline', initial: false},
  {name: 'hasPrefix', label: 'Prefix', initial: false},
  {name: 'hasSuffix', label: 'Suffix (fixed)', initial: false},
  {name: 'hasTypeAhead', label: 'Typeahead (value: "typeahead")', initial: false},
];

function SideBySide({toggleData=[]}) {   // eslint-disable-line react/prop-types
  const styles = {
    title: {
      display: 'inline-block',
      width: '256px',
      margin: '10px',
    },
    field: {
      verticalAlign: 'top',
      margin: '10px',
    },
  };

  const renderFunc = ({state, toggles}) => {   // eslint-disable-line react/prop-types
    const {
      disabled,
      hasErrorText,
      hasFloatingLabelText,
      hasHintText,
      multiLine,
      hasPrefix,
      hasSuffix,
      hasTypeAhead,
    } = state;

    return (
      <div>
        <div>
          <h5 style={styles.title}>
            material-ui-enhanced-fields
          </h5>
          <h5 style={styles.title}>
            material-ui
          </h5>
        </div>
        <div>
          <TextField
            name="enhanced"
            style={styles.field}
            prefix={hasPrefix && <Adornment>prefix</Adornment>}
            suffix={hasSuffix && <Adornment fixed>suffix</Adornment>}
            floatingLabelText={hasFloatingLabelText && 'Floating Label'}
            errorText={hasErrorText && 'Error text'}
            disabled={disabled}
            hintText={hasHintText && 'Really realy really really realy long hint text...'}
            multiLine={multiLine}
            typeAheadText={hasTypeAhead && 'typeahead'}
          />
          <MuiTextField
            name="mui"
            style={styles.field}
            floatingLabelText={hasFloatingLabelText && 'Floating Label'}
            errorText={ hasErrorText && 'Error text'}
            disabled={disabled}
            hintText={hasHintText && 'Really realy really really realy long hint text...'}
            multiLine={multiLine}
          />
        </div>
        <br/>
        <div style={{width: '256px'}}>
          <h3>Prop settings</h3>
          {toggles}
        </div>
      </div>
    );
  };

  return <PropToggler toggleData={toggleData} render={renderFunc} />;
}

function TextFieldWithFocus(props) {
  return (
    <Focus
      render={({focus, getFocusProps}) =>
        <div>
          <TextField {...props} inputRef={getFocusProps().ref} />
          <br/><br/>
          <button onClick={focus}>Click to focus</button>
        </div>
      }
    />
  );
}

storiesOf('TextField', module)
  .add('comapred with material-ui TextField', () =>
    <SideBySide toggleData={toggleData}/>
  )
  .add('with a ButtonAdornment suffix', () =>
    <TextField
      suffix={
        <ButtonAdornment
          icon={<ArrowDown/>}
          onClick={action('Clicked the button')}
        />
      }
      name="textfield"
      hintText='Hint...'
      floatingLabelText="Floating Label"
      onFocus={action('onFoucs')}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
    />
  )
  .add('with focus', () =>
    <TextFieldWithFocus
      multiLine
      name="textfield"
      prefix={<Adornment>prefix</Adornment>}
      floatingLabelText='Floating Label'
      hintText='Hint...'
      onFocus={action('onFoucs')}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
    />
  );
