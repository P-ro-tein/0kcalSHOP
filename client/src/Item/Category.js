import React,{useState} from "react";
import CategorySub from './CategorySub';
import styled from "styled-components";


const BoxCategory=styled.div`
width:1200px;
margin:0 auto;
display:inline-flex;
`;

const ContainerCategory=styled.div`
width:650px;
height:50px;
margin:0 0 0 auto;
padding-top:50px;
padding-bottom:50px;

`;

const ContainerLogin=styled.div`
    width:200px;
    height:50px;
    margin-left:30px;
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
            
            <ContainerCategory>
                <CategorySub items={items} onToggle={onToggle} />
            </ContainerCategory>
            <ContainerLogin>
                엄유상 고객님 ^~~^
            </ContainerLogin>
        </BoxCategory>
    );
}

export default Category;