import { connect } from 'react-redux';
import { TargetTable } from '../componets/TargetTable'
import { Target } from '../models/Target';
import { State } from '../reducers/OptionReducer'
import { Dispatch } from 'redux';
import { Config } from '../models/Config';
import {
    loadConfig,
    setInterval,
    addTarget,
    inputTarget,
    removeTarget
} from '../actions/Option';

const mapStateToProps = (state: State) => {
    return {...state}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadConfig: (config: Config) => dispatch(loadConfig(config)),
        setInterval: (interval: string) => dispatch(setInterval(interval)),
        addTarget: (target: Target) => dispatch(addTarget(target)),
        inputTarget: (url: string) => dispatch(inputTarget(url)),
        removeTarget: (target: Target) => dispatch(removeTarget(target))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetTable);
