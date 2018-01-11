import React from 'react';
import { Toggle } from 'material-ui';
import { State } from '@jf248/react-powerplug';

export function PropToggler({toggleData=[], render}) {   // eslint-disable-line react/prop-types
  const initial = toggleData.reduce(
    (acc, cur) => {
      acc[cur.name] = cur.initial;
      return acc;
    },
    {}
  );

  const renderFunc = ({state, setState}) => {   // eslint-disable-line react/prop-types
    const handleToggle = (event, toggled) => {
      setState({[event.target.name]: toggled});
    };

    const PropToggle = ({name, label}) =>   // eslint-disable-line react/prop-types
      <Toggle
        name={name}
        label={label}
        onToggle={handleToggle}
        toggled={state[name]}
      />;

    const toggles = toggleData.map(
      toggle => (
        <PropToggle name={toggle.name} label={toggle.label} key={toggle.name} />
      )
    );
    return (render({ state, toggles }));
  };

  return <State initial={initial} render={renderFunc}/>;
}
