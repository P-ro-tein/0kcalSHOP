import Header from "./Common/SubHeader";
import Item from "./Item/Item";
import Footer from "./Common/Footer";
import ItemDetail from "./Item/ItemDetail";
import Navbar from "./Common/Navbar";
import MainPage from "./Main/MainPage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";
import ItemSet from "./Item/ItemSet";
import ItemReplace from "./Item/ItemReplace";
import ItemHealth from "./Item/ItemHealth";
import SearchItem from "./Item/SearchItem";
import CartPage from "./Cart/CartPage";
import OrderList from "./OrderList/OrderList";

const Box = styled.div`
  width: 100%;
  height: 100%;
`;

function Client() {
  return (
    <GlobalContext>
      <Box>
        <Header />
        <Navbar />
        <Route path="/client/" component={MainPage} exact={true} />
        <Route path="/client/Item" component={Item} />
        <Route path="/client/ItemDetail/:productId" component={ItemDetail} />
        <Route path="/client/register" component={Register} />
        <Route path="/client/login" component={Login} />
        <Route path="/client/식단세트" component={ItemSet} />
        <Route path="/client/식사대용" component={ItemReplace} />
        <Route path="/client/건강간식" component={ItemHealth} />
        <Route path="/client/SearchItem" component={SearchItem} />
        <Route path="/client/Cart" component={CartPage} />
        <Route path="/client/order" component={OrderList} />
        <Footer />
      </Box>
    </GlobalContext>
  );
}

export default Client;
