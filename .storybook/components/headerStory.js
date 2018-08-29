import { React, _ } from 'appReact';
import { storiesOf } from '@storybook/react';
import AppHeader from 'components/appHeader/AppHeader';

storiesOf('Header', module).add('Default', () => (
  <AppHeader />
));