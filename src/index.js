import 'babel-polyfill';
import 'styles';

import { React, ReactDOM } from 'appReact';

import BubblePop from 'components/bubblePop/BubblePop';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BubblePop />, document.getElementById('root'));
registerServiceWorker();
