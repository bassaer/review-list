import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './componets/App';
import { Option } from './componets/Option';
import * as serviceWorker from './serviceWorker';

if (window.location.hash && window.location.hash === '#options') {
    ReactDOM.render(<Option />, document.getElementById('root'));
} else {
    ReactDOM.render(<App />, document.getElementById('root'));
}

serviceWorker.unregister();
