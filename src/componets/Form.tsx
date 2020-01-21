import React, { FormEvent } from 'react';
import { State } from '../reducers/OptionReducer';
import { OptionActions } from '../actions/Option';

const TARGET_HINT = 'https://api.github.com/search/issues?q=is:open+involves:myname+repo:myorg/myrepo'

type Props = State & OptionActions
export const Form: React.FC<Props> = (props: Props) => {
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let exists = false;
        props.targets.forEach(target => {
            if (props.url === target.url) {
                exists = true;
                alert("Already exists.");
            }
        });
        if (!exists) {
            props.addTarget({url: props.url, issues: []});
            props.inputTarget('');
        }
    }
    return (
        <div className="form">
            <form>
                <div className="input-field">
                    <input
                        id="interval"
                        min="1"
                        type="number"
                        value={props.interval}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            props.setInterval(event.currentTarget.value);
                        }}
                        disabled
                    />
                    <label htmlFor="interval">Update Interval ( min : 1m , Currently Unchangeable )</label>
                </div>
            </form>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input
                        id="api_url"
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            props.inputTarget(event.currentTarget.value);
                        }}
                        type="text"
                        value={props.url}
                        required
                    />
                    <label htmlFor="api_url">API URL ( e.g. { TARGET_HINT } )</label>
                </div>
            </form>
        </div>
    );
};
