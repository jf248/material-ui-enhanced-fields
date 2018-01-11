import React from 'react';
import { addDecorator, configure } from '@storybook/react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

addDecorator(story =>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    {story()}
  </MuiThemeProvider>
);

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
