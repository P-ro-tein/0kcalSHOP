import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Event from './Event';
import HotItem from "./HotItem";

const Box=styled.div`
display: flex;
justify-content: center;
width:100%;
`;

function MainPage(){
    return(
        <>
        <Event/>
        <Box>
            <HotItem/>
        </Box>
        </>
    );
}

export default MainPage;