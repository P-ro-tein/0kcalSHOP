import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Event from './Event';
import NewItem from './NewItem';    
import HotItem from "./HotItem";

function MainPage(){
    return(
        <>
        <Link to="/">
            <Event />
        </Link>
        <NewItem />
        <HotItem />
        </>
    );
}

export default MainPage;