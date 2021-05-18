import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterForm from './RegisterForm';
import RegisterDone from './RegisterDone';

function Register () {
    return (
            <Router>
                <Switch>
                    <Route path="/done" component={RegisterDone} />
                    <Route path="" exact={true} component={RegisterForm} />
                </Switch>
            </Router>
        );
}

export default Register;