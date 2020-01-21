import React from 'react';
import Form from '../containers/FormContainer'
import TargetTable from '../containers/TargetTableContainer'
import '../styles/TargetTable.scss'
import { Provider } from 'react-redux';
import store from '../models/Store';

export const Option: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="option-container">
                <Form />
                <TargetTable />
            </div>
        </Provider>
    )
};
