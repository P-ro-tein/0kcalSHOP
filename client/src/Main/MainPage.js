import React from "react";
import Styled from 'styled-components';
import {Link} from 'react-router-dom';

import Event from './Event';

function MainPage(){
    return(
        <Link to="/">
            <Event />
        </Link>
    );
}

export default MainPage;