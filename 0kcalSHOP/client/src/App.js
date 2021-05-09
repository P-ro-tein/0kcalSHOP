import Nav from './Common/Nav';
import Item from './Item/Item';
import Category from './Item/Category';
import Footer from './Common/Footer';
import ItemDetail from './Item/ItemDetail';

import {BrowserRouter as Router,Route} from "react-router-dom";
import styled from 'styled-components';
import {SEProvider} from './Context/Context';
import axios from 'axios';

const Box=styled.div`
width:100%;
height:100%;
`;

function App() {
  return (
    <Router>
    <SEProvider>
    <Box>
    <Nav/>
      <Category />
      <Route path="/" component={Item} exact={true} />
      <Route path="/Itemdetail" component={ItemDetail} />
    <Footer />
    </Box>
    </SEProvider>
    </Router>
  );
}

export default App;
