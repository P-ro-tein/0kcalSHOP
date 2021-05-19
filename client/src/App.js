import Header from './Common/Header';
import Item from './Item/Item';
import Footer from './Common/Footer';
import ItemDetail from './Item/ItemDetail';
import Navbar from "./Common/Navbar"
import MainPage from "./Main/MainPage";
import Register from "./Register/Register";

import {BrowserRouter as Router,Route} from "react-router-dom";
import styled from 'styled-components';
import {SEProvider} from './Context/Context';


const Box=styled.div`
width:100%;
height:100%;
`;

function App() {
  return (
    <Router>
    <SEProvider>
    <Box>
    <Header/>
      <Navbar />
      <Route path="/" component={MainPage} exact={true} />
      <Route path="/Item" component={Item} />
      <Route path="/ItemDetail" component={ItemDetail} />
      <Route path="/register" component={Register} />
    <Footer />
    </Box>
    </SEProvider>
    </Router>
  );
}

export default App;
