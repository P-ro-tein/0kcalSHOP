import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import { SEProvider } from './Context/Context'
import Client from './Client';
import Admin from './Admin/Admin';

function App () {
    return (
        <BrowserRouter>
            <SEProvider>
                <Route path="/client" component={Client}/>
                <Route path="/admin" component={Admin}/>
            </SEProvider>
        </BrowserRouter>
    )
}

export default App
