import React from 'react';
import {Route} from "react-router-dom";
import RegisterDone from './RegisterDone';
import RegisterForm from './RegisterForm';

function Register () {
    return (
            <div>
                <Route path="" exact={true} component={RegisterForm} />
                <Route path="/done" component={RegisterDone} />
            </div>
        );
}

export default Register;