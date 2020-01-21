import { Reducer } from 'redux';
import { ActionType, OptionAction } from '../actions/Option';
import { Target } from '../models/Target';

export interface State {
    interval: string
    url: string
    targets: Array<Target>
}

const initialState: State = {
    interval: '1',
    url: '',
    targets: []
}

export const optionReducer: Reducer<State, OptionAction> = (state: State = initialState, action: OptionAction) => {
    switch(action.type) {
        case ActionType.LOAD_CONFIG:
            return {
                ...state,
                interval: action.payload.interval ? action.payload.interval : '1',
                targets: action.payload.targets ? action.payload.targets : []
            }
        case ActionType.SET_INTERVAL:
            return {
                ...state,
                interval: action.payload.interval
            }
        case ActionType.ADD_TARGET:
            return {
                ...state,
                targets: state.targets.concat([action.payload.target])
            };
        case ActionType.INPUT_TARGET:
            return {
                ...state,
                url: action.payload.url
            }
        case ActionType.REMOVE_TARGET:
            return {
                ...state,
                targets: state.targets.filter(target => target.url !== action.payload.target.url)
            };
        default:
            return state;
    }
}
