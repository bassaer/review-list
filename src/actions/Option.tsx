import { Action } from 'redux';
import { Target } from '../models/Target';
import { Config } from '../models/Config';

export enum ActionType {
    LOAD_CONFIG = 'LOAD_CONFIG',
    SET_INTERVAL = 'SET_INTERVAL',
    ADD_TARGET = 'ADD_TARGET',
    INPUT_TARGET = 'INPUT_TARGET',
    REMOVE_TARGET = 'REMOVE_TARGET'
}

export interface OptionAction extends Action {
    payload: {
        interval: string
        url: string
        target: Target
        targets: Array<Target>
    }
};

export const loadConfig = (config: Config): OptionAction => ({
    type: ActionType.LOAD_CONFIG,
    payload: {
        interval: config.interval,
        url: '',
        target: {url: '', issues: []},
        targets: config.targets
    }
});

export const setInterval = (interval: string): OptionAction => ({
    type: ActionType.SET_INTERVAL,
    payload: {
        interval: interval,
        url: '',
        target: {url: '', issues: []},
        targets: []
    }

});

export const addTarget = (target: Target): OptionAction => ({
    type: ActionType.ADD_TARGET,
    payload: {
        interval: '',
        url: target.url,
        target: target,
        targets: []
    }
});

export const inputTarget = (url: string): OptionAction => ({
    type: ActionType.INPUT_TARGET,
    payload: {
        interval: '',
        url: url,
        target: {url: url, issues: []},
        targets: []
    }
});

export const removeTarget = (target: Target): OptionAction => ({
    type: ActionType.REMOVE_TARGET,
    payload: {
        interval: '',
        url: '',
        target: target,
        targets: []
    }
});

export interface OptionActions {
    loadConfig: (config: Config) => OptionAction
    setInterval: (interval: string) => OptionAction
    addTarget: (taret: Target) => OptionAction
    inputTarget: (url: string) => OptionAction
    removeTarget: (taret: Target) => OptionAction
}
