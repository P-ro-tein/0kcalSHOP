import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import axios from "axios";

const Box = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
function Event() {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    axios
      .post("/api/notice/list")
      .then((response) => {
        setEvent(response.data.noticeInfo);
      })
      .catch((err) => alert("안돼!"));
  }, []);

  const settings = {
    dots: false,
    speed: 500,
    arrows: true,
    SlidesToShow: 1,
    SlidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  return (
    <Box>
      <Slider {...settings}>
        {event.map((data) => {
          return (
            <img
              alt={data._id}
              src={`http://ec2-52-79-226-115.ap-northeast-2.compute.amazonaws.com:9000/noticeImageUploads/${data.images[0]}`}
              width="100%"
              height="400"
            ></img>
          );
        })}
      </Slider>
    </Box>
  );
}

export default Event;
