import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./Header";
import Category from "./Category";
import Nsearch from "./Nsearch";
import Nregist from "./Nregist";
import Psearch from "./Psearch";
import Pregist from "./Pregist";
import Porder from "./Porder";
import Pstat from "./Pstat";
import Pmodify from "./Pmodify";

function Admin() {
    return (
        <div className="App">
          
          <Header />
          <Category />
          <Route path="/admin/nsearch" component={Nsearch} />
          <Route path="/admin/nregist" component={Nregist} />
          <Route path="/admin/psearch" component={Psearch} />
          <Route path="/admin/pregist" component={Pregist} />
          <Route path="/admin/pstat" component={Pstat} />
          <Route path="/admin/porder" component={Porder} />
          <Route exact path="/admin/product/:productId" component={Pmodify}/>
  
        </div>
    );
  }
  
  export default Admin;