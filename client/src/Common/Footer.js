import React from 'react';
import styled from 'styled-components';
import FooterPng from '../Footer.png';

const BoxFooter=styled.div`
width:100%;

`;

const BoxUnderFooter=styled.div`
width:100%;
background:#f8f8f8;
height:200px;
`;

const ContainerFooter=styled.div`
width:1200px;
height:270px;
margin:0 auto;
`;

const ContainerUnderFooter=styled.div`
width:1200px;
margin:0 auto;
padding-top:30px;

`;

const TextUnder=styled.p`
    color:black;
    font-size:13px;
`;

const Text=styled.div`
    width:240px;
    float:left;
    padding:30px;
    font-size:15px;
`;


const TextTitle=styled.div`
    font-size:20px;
    font-weight:bold;
    margin-bottom:20px;
`;

const Banner=styled.img`
    background:#121212;
    position:relative;
    left:450px;
    height:70px;
    top:-80px;
`;

function Footer(){
    return(
        <>
        <div style={{background:'#121212',width:"100%",height:"100px",position:"relative"}}></div>
        <Banner alt="footer" src={FooterPng}/>
        <BoxFooter>
        <ContainerFooter>
        <Text>
            <TextTitle style={{display:'inline',}}>
            <img alt="call" src="https://image.flaticon.com/icons/png/512/1176/1176894.png" width="20" height="20"></img>
            <span>무엇을 도와드릴까요?</span>
            </TextTitle>
            <div style={{color:'grey',fontSize:'12px'}}>
                <p>평일 10:00 ~ 18:00 (주말 및 공휴일 휴무)<br></br>점심시간 12:30 ~ 13:30</p>
            </div>
            </Text>
        <Text>
            <TextTitle>
                0Kcal Shop
            </TextTitle>
            <div>
                <p>채팅 상담하기</p>
                <hr style={{opacity:0.6}}></hr>
                <p>문의 글 남기기</p>
                <hr style={{opacity:0.6}}></hr>
                <p>전화 문의하기</p>
                <hr style={{opacity:0.6}}></hr>
            </div>
        </Text>
        <Text>
            <TextTitle>
                제휴 / 입점문의
            </TextTitle>
            <button style={{width:'100%',height:'50px',background:'white'}}>0Kcal Shop 입점 문의하기</button>
        </Text>
        <Text>
            <TextTitle>SNS</TextTitle>
            <div style={{display:'inline'}}>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://image.flaticon.com/icons/png/512/2111/2111463.png" width="40" alt="instagram"></img>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://image.flaticon.com/icons/png/512/1384/1384060.png" width="40" alt="youtube"></img>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://image.flaticon.com/icons/png/512/2111/2111398.png" width="40" alt="facebook"></img>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://image.flaticon.com/icons/png/512/2111/2111466.png" width="40" alt="kakao"></img>
            </div>
        </Text>
        </ContainerFooter>
        </BoxFooter>
        <BoxUnderFooter>
        <ContainerUnderFooter>
            <TextUnder>대표:김진대 | 주소:서울시 공릉로 232 미래관 (주)Protein | 사업자등록번호:123-45-67890</TextUnder>
            <TextUnder>개인정보보호책임자:엄유상 | 통신판매업 신고번호:제2021-공릉-1234 | 건강기능식품판매업 신고번호:제 2021-0123456호</TextUnder>
            <TextUnder>Copyright @ Protein, Inc. All rights Rese</TextUnder>
        </ContainerUnderFooter>
        </BoxUnderFooter>
        </>
    );
}

export default Footer;