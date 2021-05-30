import React,{useState} from "react";
import styled from "styled-components";

import Search from "../Common/Search";
import Login from "../Main/Login";

const BoxCategory=styled.div`
width:1200px;
display:flex;
margin:0 auto;
`;

const ContainerCategory=styled.div`
width:550px;
height:130px;
padding-left:100px;
padding-top:15px;

`;

const ContainerLogin=styled.div`
    width:250px;
    height:50px;
    padding:30px;
`;



function Category(){
    
    const [items, setItems] = useState([
        {
            id:1,
            category:'식단세트',
            active:false,
        },
        { 
            id:2,
            category:'식사대용',
            active:false, 
        }, 
        {
            id:3,
            category:'건강간식',
            active:false,
        }, 
        {
            id:4,
            category:'차/음료/두유',
            active:false,
        }, 
        {   
            id:5,
            category:'오일/소스/향신료',
            active:false,
        }
    ]);

    const onToggle = id => {
        setItems(
            items.map(data =>
              data.id === id ? { ...data, active: !data.active } : data
            )
          );
        };

    return(
        <BoxCategory>
            <div style={{width:'200px'}}></div>
            <ContainerCategory>
                <Search />
            </ContainerCategory>
            <ContainerLogin>
                <Login />
            </ContainerLogin>
        </BoxCategory>
    );
}

export default Category;