import React from "react";
import styled from 'styled-components';

const Box=styled.div`
    width:1200px;
    display:flex;

`;

const Container=styled.div`
    display:block;
`;
const ItemBox = styled.div`
    width:200px;
    height:200px;
    cursor:pointer;
`;

const ItemName=styled.div`

`;
function HotItem(){
    const item=[
        {
            id:1,
            name:"다노 홈트 매트 (미끄럼 방지, 층간 소음 감소)",
            imgUrl:"https://danoshop.net/mall/upload/2020/06/08/htmt_716x478.jpg",
        },
        {
            id:2,
            name:"다노 다노한끼 시즌4 저당 곤약 도시락(7팩/14팩)",
            imgUrl:"https://danoshop.net/mall/upload/2020/12/15/hover_season4.png",
        },
        {
            id:3,
            name:"다노 다노한끼 도시락 시즌3(7팩/14팩)",
            imgUrl:"https://danoshop.net/mall/upload/2020/12/15/hover_season3.png",
        },
        {
            id:4,
            name:"다노 닭가슴살 미니볼(오리지널/매운맛)",
            imgUrl:"https://danoshop.net/mall/upload/2019/07/01/miniball_hover.jpg",
        },
        {
            id:5,
            name:"다노 다노한끼 닭가슴살 도시락 (7팩/14팩)",
            imgUrl:"https://danoshop.net/mall/upload/2019/01/07/meal_hover.png",
        },
        {
            id:6,
            name:"다노 곤약비빔밥",
            imgUrl:"https://danoshop.net/mall/upload/2020/09/03/hover_oV3jOjP.png",
        },
        {
            id:7,
            name:"베트남 쌀국수 2종(소고기/닭고기)",
            imgUrl:"https://danoshop.net/mall/upload/2020/01/31/pho_716x478.jpg",
        },
        {
            id:8,
            name:"떡볶이 2종 (매콤/짜장)",
            imgUrl:"https://danoshop.net/mall/upload/2020/12/15/hover_bbokki.jpg",
        }
    ];
    return(
        <>
            
        </>
    );
}

export default HotItem;