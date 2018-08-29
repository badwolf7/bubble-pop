import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import StorybookWrapper from './storybookWrapper';

addDecorator((story, context) => withInfo()(story)(context));
addDecorator(story => <StorybookWrapper story={story} />);

function loadStories() {
  const requireAllStories = require.context('./components', true, /\.js$/);
  requireAllStories.keys().forEach(filename => requireAllStories(filename));
}

configure(loadStories, module);
