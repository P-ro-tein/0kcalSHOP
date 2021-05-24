import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import Client from './Client';
import Admin from './Admin/Admin';

function App () {
    return (
        <BrowserRouter>
                <Route path="/client" component={Client}/>
                <Route path="/admin" component={Admin}/>
        </BrowserRouter>
    )
}

export default App;
