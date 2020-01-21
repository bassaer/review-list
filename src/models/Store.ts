import { createStore, applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import { optionReducer } from '../reducers/OptionReducer';
import { storageMiddleware } from '../middleware/Storage'
import { loadConfig } from '../actions/Option';
import { Config } from './Config';

const store = createStore(
    optionReducer,
    applyMiddleware(thunk, storageMiddleware)
);

if (chrome.storage) {
    chrome.storage.local.get('config', data => {
        if (data.config) {
            store.dispatch(loadConfig(data.config as Config))
        }
    });
}

export default store;
