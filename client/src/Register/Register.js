import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterForm from './RegisterForm';
import RegisterDone from './RegisterDone';

function Register () {
    return (
            <Router>
                    <Route path="/done" component={RegisterDone} />
                    <Route path="" exact={true} component={RegisterForm} />
            </Router>
        );
}

export default Register;