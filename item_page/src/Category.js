import React,{useState} from "react";
import styled from "styled-components";

const BoxCategory=styled.div`
width:1200px;
margin:0 auto;
display:inline-flex;
`;

const ContainerCategory=styled.div`
width:650px;
height:50px;
margin:0 auto;
padding-top:50px;
padding-bottom:50px;

`;

const ContainerLogin=styled.div`
    width:200px;
    height:50px;
    margin-left:30px;
`;

const List=styled.button`
    margin-left:20px;
    font-family: Kanit;
    font-size: 18px;
    display: inline;
    cursor:pointer;
    border:0;
    background:white;

`;

const Selected=styled.button`
    margin-left:20px;
    font-family:Kanit;
    font-size:18px;
    display:inline;
    cursor:pointer;
    font-weight:bold;
    border:0;
    background:white;
`;



function Category(){
    
    const [inputs,setInputs] = useState([
        {
            id:1,
            name:'식단세트',
            active:false,
        },
        { 
            id:2,
            name:'식사대용',
            active:false, 
        }, 
        {
            id:3,
            name:'건강간식',
            active:false,
        }, 
        {
            id:4,
            name:'차/음료/두유',
            active:false,
        }, 
        {   
            id:5,
            name:'오일/소스/향신료',
            active:false,
        }
    ]);

    const onToggle = id => {
        console.log(inputs);
        setInputs(
          inputs.map(input =>
            input.id === id ? { ...input, active: !input.active } : input
          )
        );
        console.log(inputs);
      };

    return(
        <BoxCategory>
            
            <ContainerCategory>
                {inputs.map((names)=>{
                    return(
                        <>
                        <List onClick={onToggle} value={names.active}>{names.name}</List>
                        </>
                    );
                })}
            </ContainerCategory>
            <ContainerLogin>
                엄유상 고객님 ^~~^
            </ContainerLogin>
        </BoxCategory>
    );
}

export default Category;