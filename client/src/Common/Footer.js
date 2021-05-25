import React from 'react';
import styled from 'styled-components';

const BoxFooter=styled.div`
width:100%;

`;

const BoxUnderFooter=styled.div`
width:100%;
background:#ff7777;
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

const Banner=styled.div`
    background:black;
    width:100%;
    height:100px;
    margin-bottom:20px;
    color:white;
    font-family: Neuton;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
`;

function Footer(){
    return(
        <>
        <Banner>
            <div style={{width:'550px',margin:'0 auto', padding:'30px'}}> 
            
            <div style={{float:'left'}}>
            올해의 신규 브랜드 대상 수상
            </div>
            <img style={{float:'left',marginLeft:'50px'}} alt="prize" src="https://www.flaticon.com/svg/vstatic/svg/744/744984.svg?token=exp=1619601165~hmac=6fa618b421c122a7e7877c185edff386" width="50"></img>
            </div>
        </Banner>
        <BoxFooter>
        <ContainerFooter>
        <Text>
            <TextTitle style={{display:'inline',}}>
            <img alt="call" src="https://www.flaticon.com/svg/vstatic/svg/1170/1170646.svg?token=exp=1619598312~hmac=81ff415b8f57e2a1b87eda33e82a99d9" width="20" height="20"></img>
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
                <img style={{padding:'10px',cursor:'pointer'}} src="https://www.flaticon.com/svg/vstatic/svg/1384/1384063.svg?token=exp=1619600148~hmac=cf2d28ac47c44d19eae3728527a34653" width="40" alt="instagram"></img>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://www.flaticon.com/svg/vstatic/svg/187/187209.svg?token=exp=1619600195~hmac=1b9e4eca64bfd4ef10965ab7e87e8754" width="40" alt="youtube"></img>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://www.flaticon.com/svg/vstatic/svg/145/145802.svg?token=exp=1619600217~hmac=ac5849888806da952d29c49e717943f3" width="40" alt="facebook"></img>
                <img style={{padding:'10px',cursor:'pointer'}} src="https://www.flaticon.com/svg/vstatic/svg/2111/2111466.svg?token=exp=1619600369~hmac=064ad33a7a27b091564948f0fdb2e2b7" width="40" alt="kakao"></img>
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