import { Middleware } from "redux";
import { ActionType } from "../actions/Option";
import { Config } from "../models/Config";

export const storageMiddleware: Middleware = store => next => action => {
    const result = next(action);
    if (!chrome.storage ||
        action.type === ActionType.INPUT_TARGET ||
        action.type === ActionType.LOAD_CONFIG) {
        return result;
    }
    const state = store.getState();
    const config: Config = {
        interval: state.interval ? state.interval : '1',
        targets: state.targets
    };
    chrome.storage.local.set({config: config});

    return result;
}
