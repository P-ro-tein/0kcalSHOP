import React from 'react';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components';

const Box= styled.div`
    width:width:100%;
    height:100%;
    cursor:pointer;
    `;
function Event(){
    const events=[
        {
            id:1,
            imgUrl:"https://serybox.wisacdn.com/_data/banner/30bf3bd36f566aeccff20a2f4e76b425.jpg",
        },
        {
            id:2,
            imgUrl:"https://serybox.wisacdn.com/_data/banner/82c69f17229c07b97de5fb21e7460eb0.jpg",
        },
        {
            id:3,
            imgUrl:"https://serybox.wisacdn.com/_data/banner/607359eee6eb9c4c6d4e53158a2d0bba.jpg",
        }
    ];
    const settings={
        dots:false,
        speed:500,
        arrows:true,
        SlidesToShow:1,
        SlidesToScroll:1,
        autoplay:true,
        pauseOnHover:false,
    }; 

    return(
        <Box>
            <Slider {...settings}>{events.map((data)=>{
               return <img key={data.id} alt={data.id} src={data.imgUrl}/>;
            })}</Slider>
        </Box>
    );
}

export default Event;