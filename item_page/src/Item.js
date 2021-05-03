import React from 'react';
import styled from 'styled-components';

const item = [
    {
      id:1,
      name: '다노 저염 아침식단세트',
      category: [
          '식단세트',
          '차/음료/두유'
        ],  
      imgUrl:'https://danoshop.net/mall/upload/2020/12/28/hover_morning.png',
    },
    {
      id:2,
      name: '프로틴 브라솔&브라오 세트',
      category: '식단세트',
      imgUrl:'https://danoshop.net/mall/upload/2020/11/04/%E1%84%87%E1%85%B3%E1%84%85%E1%85%A1%E1%84%89%E1%85%A9%E1%86%AF%E1%84%87%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%A9_%E1%84%92%E1%85%A9%E1%84%87%E1%85%A5.png',
    },
    {
      id:3,
      name: '다노 구워먹는 치즈',
      category: '식사대용',
      imgUrl:'https://danoshop.net/mall/upload/2020/12/29/hover_grilledcheese.png',
    },
    {
      id:4,
      name: '다노 다노한끼 도시락 21종 골라담기',
      category:'식사대용',
      imgUrl:'https://danoshop.net/mall/upload/2020/12/15/hover_dosirak21.png',
    },
    {
      id:5,
      name: '다노 프로틴초코볼',
      category: '건강간식',
      imgUrl:'https://danoshop.net/mall/upload/2020/12/15/hover_chocoball.png',
    },
    {
      id:6,
        name:'다노 건강 선물 세트',
        category:'건강간식',
        imgUrl:'https://danoshop.net/mall/upload/2021/01/06/hover_3set.png',
    },
    {
      id:7,
        name:'소이포유 비건요거트 3종 set',
        category:'차/음료/두유',
        imgUrl:'https://danoshop.net/mall/upload/2020/12/15/hover_soyyogurt.png',
    },
    {
      id:8,
        name:'샐러드 소스 2종 (유자,오리엔탈)',
        category:'오일/소스/향신료',
        imgUrl:'https://danoshop.net/mall/upload/2020/12/15/hover_sauce.png',
    },
    {
      id:9,
        name:'잇츠베러 마요SET',
        category:'오일/소스/향신료',
        imgUrl:'https://danoshop.net/mall/upload/2020/12/15/hover_mayo.png',
    }
  ];

  const Box=styled.div`
display:block;
width:1200px;
height:1200px;
margin:0 auto;
`;

const BoxItem=styled.div`
float:left;
width:280px;
height:280px;
margin:10px;
margin-bottom:100px;
cursor:pointer;
`;

const ItemDetail=styled.div`
display:block;
width:100%;
height:50px;
padding-top:10px;
font-size:15px;
`;

function Category(){
    return(
      <Box>
        {item.map((data)=>{
          return(
            <>
            <BoxItem>
               <img src={data.imgUrl} alt={data.id} width="100%" height="280"/>
               <ItemDetail>{data.name}</ItemDetail>            
            </BoxItem>
            </>
          ); 
      })}
      </Box>
    );
}

export default Category;