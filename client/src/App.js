import React from 'react'
import { Route,BrowserRouter } from 'react-router-dom';
import { GlobalContext } from "./GlobalContext";
import Client from './Client';
import Admin from './Admin/Admin';

function App () {
    return (
        <BrowserRouter>
        <GlobalContext>
                <Route path="/client" component={Client}/>
                <Route path="/admin" component={Admin}/>
        </GlobalContext>
        </BrowserRouter>
    )
}

export default App;
