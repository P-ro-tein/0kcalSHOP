import Header from './Common/SubHeader';
import Item from './Item/Item';
import Footer from './Common/Footer';
import ItemDetail from './Item/ItemDetail';
import Navbar from "./Common/Navbar"
import MainPage from "./Main/MainPage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import {Route} from "react-router-dom";
import styled from 'styled-components';
import { GlobalContext } from "./GlobalContext";


const Box=styled.div`
width:100%;
height:100%;
`;

function Client() {
  return (
    <GlobalContext>
    <Box>
    <Header/>
      <Navbar />
      <Route path="/client/" component={MainPage} exact={true} />
      <Route path="/client/Item" component={Item} />
      <Route path="/client/ItemDetail/:productId" component={ItemDetail} />
      <Route path="/client/register" component={Register} />
      <Route path="/client/login" component={Login} />
      <Footer />
    </Box>
    </GlobalContext>
  );
}

export default Client;