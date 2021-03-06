import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useGlobalDispatch } from "../GlobalContext";

import axios from "axios";
import ShipAddModal from "../Shipping/ShipAddModal";
import ShipModifyModal from "../Shipping/ShipModifyModal";
import ItemReview from "./ItemReview";
import "../AllCss.css";
const DetailText = styled.div`
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 10px 10px 5px;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 23px;
  padding-bottom: 10px;
`;
const Description = styled.div`
  color: grey;
  font-size: 13px;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Number = styled.div`
  width: 200px;
  height: 31px;
  text-align: center;
  font-size: 18px;
  border: 2px solid #ff7777;
`;

const DescriptionBox = styled.div`
  background-color: #ff7777;
  width: 500px;
  height: 40px;
  color: white;
  text-align: center;
  padding-top: 15px;
  font-size: 18px;
`;

const Container = styled.div`
  padding-top: 25px;
  padding-bottom: 10px;
  display: inline-flex;
`;
const Box = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const TopBox = styled.div`
  width: 100%;
  display: inline-flex;
  padding-bottom: 200px;
`;
const LeftContainer = styled.div`
  width: 650px;
  height: 400px;
`;

const RightContainer = styled.div`
  width: 400px;
  height: 355px;
  padding-top: 45px;
`;

const DescriptionContainer = styled.div`
  height: 100%;
  width: 600px;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 200px;
`;

const Destination = styled.div`
  width: 170px;
  height: 30px;
  border: 2px solid #ff7777;
  text-align: right;
  font-size: 18px;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

function ItemDetail(props) {
  const [number, setNumber] = useState(0);
  const [DeliverymodalOpen, setDeliveryModalOpen] = useState(false);
  const [ModifymodalOpen, setModifyModalOpen] = useState(false);
  const productId = props.match.params.productId;
  const [defaultShip, setDefaultShip] = useState("");
  const [Product, setProduct] = useState({});

  const dispatch = useGlobalDispatch();

  const settings = {
    dots: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
    axios
      .post("/api/shipAddr/list", {
        order: "desc",
        sortBy: "defaultShip",
      })
      .then((response) => {
        if (response.data.success && response.data.shipAddrInfo)
          setDefaultShip(response.data.shipAddrInfo[0]);
        console.log(defaultShip);
      });
  }, [productId, Product.images]);

  const openDeliveryModal = () => {
    setDeliveryModalOpen(true);
  };

  const closeDeliveryModal = () => {
    setDeliveryModalOpen(false);
  };

  const addToCart = useCallback(() => {
    axios
      .post("/api/users/addToCart", {
        productId: productId,
        quantity: number,
        price: Product.price,
        ship: Product.shipCharge,
      })
      .then((res) => {
        if (res.data.success) {
          alert("??????????????? ?????????????????????");
        } else {
          alert("????????? ????????????");
        }
      });
    dispatch({
      type: "SET_NUM",
      number,
    });
  }, [dispatch, number]);

  const openModifyModal = () => {
    setModifyModalOpen(true);
  };

  const closeModifyModal = () => {
    setModifyModalOpen(false);
  };

  const onIncrease = () => {
    if (number === 50) {
      setNumber(50);
    } else {
      setNumber((prevNumber) => prevNumber + 1);
    }
  };

  const onDecrease = () => {
    if (number === 0) {
      setNumber(0);
    } else {
      setNumber((prevNumber) => prevNumber - 1);
    }
  };
  return (
    <>
      <Box>
        <TopBox>
          <LeftContainer>
            <DetailText>{Product.category}</DetailText>
            <div style={{ width: "600px" }}>
              {Product.images && Product.images.length > 0 && (
                <StyledSlider {...settings}>
                  {Product.images.map((data) => {
                    return (
                      <img
                        alt={data._id}
                        src={`/uploads/${data}`}
                        width="100%"
                        height="400"
                      ></img>
                    );
                  })}
                </StyledSlider>
              )}
            </div>
          </LeftContainer>
          <RightContainer>
            <ItemName>{Product.title}</ItemName>
            <Description>{Product.description}</Description>
            <hr></hr>
            <Container>
              <DetailText>??????</DetailText>
              <Price style={{ marginLeft: "200px" }}>
                {Product.price}
                <span>???</span>
              </Price>
            </Container>
            <hr></hr>
            <Container>
              <DetailText>??????</DetailText>
              <button onClick={onIncrease} className="num">
                +
              </button>
              <Number>{number}</Number>
              <button onClick={onDecrease} className="num">
                -
              </button>
            </Container>
            <Container>
              <DetailText>?????????</DetailText>
              <Destination>{defaultShip.shipAddrName}</Destination>
              <button onClick={openModifyModal} className="modify">
                ??????
              </button>
              <button onClick={openDeliveryModal} className="modify">
                ??????
              </button>
              <br />
            </Container>
            <Destination
              style={{ width: "270px", height: "auto", marginLeft: "115px" }}
            >
              {!defaultShip.shipAddrName ? " " : defaultShip.shipAddrDetail}
            </Destination>

            <ShipModifyModal
              open={ModifymodalOpen}
              close={closeModifyModal}
              header="????????? ??????"
            ></ShipModifyModal>
            <ShipAddModal
              open={DeliverymodalOpen}
              close={closeDeliveryModal}
              header="????????? ??????"
            ></ShipAddModal>
            <hr></hr>
            <button className="cart" onClick={addToCart}>
              ????????????
            </button>
            <button className="cart">????????????</button>
          </RightContainer>
        </TopBox>
        <DescriptionBox>?????? ??????</DescriptionBox>
        <hr></hr>
        <DescriptionContainer>
          {Product.images && Product.images.length > 0 && (
            <img
              alt={Product._id}
              src={`/uploads/${Product.images[1]}`}
              width="500"
            ></img>
          )}
        </DescriptionContainer>
        <DescriptionBox>?????? ??????</DescriptionBox>
        <hr></hr>
        {Product.reviews && Product.reviews.length > 0 && (
          <>
            {Product.reviews.map((data) => {
              return <ItemReview product={data}></ItemReview>;
            })}
          </>
        )}
      </Box>
    </>
  );
}

export default ItemDetail;
