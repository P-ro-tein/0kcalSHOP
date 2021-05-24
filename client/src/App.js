import React from 'react';

import Header from './Common/Header';
import Item from './Item/Item';
import Footer from './Common/Footer';
import ItemDetail from './Item/ItemDetail';
import Navbar from "./Common/Navbar"
import MainPage from "./Main/MainPage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import {BrowserRouter as Router,Route} from "react-router-dom";
import styled from 'styled-components';
import CartPage from './Cart/CartPage';


const Box=styled.div`
width:100%;
height:100%;
`;

function App() {
  return (
    <Router>
    <Box>
    <Header/>
      <Navbar />
      <Route path="/" component={MainPage} exact={true} />
      <Route path="/Item" component={Item} />
      <Route path="/product/:productId" component={ItemDetail} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/Cart" component={CartPage} />
      <Footer />
    </Box>
    </Router>
  );
}

export default App;
