import Nav from './Nav';
import Item from './Item';
import Category from './Category';
import Footer from './Footer';

import styled from 'styled-components';



const Box=styled.div`
width:100%;
height:100%;
`;

function App() {
  return (
    <>
    <Box>
    <Nav/>
      <Category />
      <Item />
    <Footer />
    </Box>
    </>
  );
}

export default App;
