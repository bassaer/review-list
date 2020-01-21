import React from 'react';
import { State } from '../reducers/OptionReducer';
import { OptionActions } from '../actions/Option';

type Props = State & OptionActions

export const TargetTable: React.FC<Props> = (props: Props) => {
    const rows = Object.values(props.targets).map((target) =>
        <li className="collection-item" key={target.url}>
            <div>
                {target.url}
                <a
                    className="secondary-content"
                    href="#options"
                    onClick={() => {
                        props.removeTarget(target)
                        return false;
                    }}
                >
                    <i className="material-icons">clear</i>
                </a>
            </div>
        </li>
    );
    return (
        <ul className="collection with-header">
           <li className="collection-header center-align">
               <h5>Targets</h5>
            </li>
            { rows.length > 0 ? rows : <p className="center-align">No Targets</p> }
        </ul>
    );
};
